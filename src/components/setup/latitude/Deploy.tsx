"use client";

import { useEffect, useRef, useState } from "react";
import ServerOverview from "./components/ServerOverview";
import SolanaOverview from "./components/SolanaOverview";
import { type LatitudeServer } from "./types/LatitudeServer";
import { AgentContextProvider, useAgentContext } from "@/contexts/AgentContext";
import AgentLogs from "./components/AgentLogs";
import { type LatitudeProject } from "./types/LatitudeProject";
import { type LatitudeUserdata } from "./types/LatitudeUserdata";
import DeployStatusBar from "./components/DeployStatusBar";
import AgentOverview from "./components/AgentOverview";

const USERDATA = `#cloud-config

ansible:
  package_name: ansible
  install_method: distro
  pull:
    url: https://github.com/trustless-engineering/sp-ansible.git
    playbook_name: init.yaml
`;

const request = async (path: string, method: string, body?: any): Promise<Response> => {
  return await fetch(`https://api.latitude.sh${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_LATITUDE_API_KEY as string,
    },
  });
};

interface DeployStepProps {
  onSuccess: () => void;
  onFail: (error: any) => void;
  site?: string;
  plan?: string;
}

export default function DeployStep({ onSuccess, onFail, site, plan }: DeployStepProps): React.JSX.Element {
  const [project, setProject] = useState<LatitudeProject>();
  const [userdata, setUserdata] = useState<LatitudeUserdata>();
  const [server, setServer] = useState<LatitudeServer | null>(null);

  const getProject = async (): Promise<any> => {
    const res = await request(`/projects?filter[name]=sol-panel`, "GET");
    const data = await res.json();
    console.log("existing project", data.data[0]);
    if (data.data.length > 0) {
      return data.data[0];
    } else {
      return await createProject();
    }
  };

  const createProject = async (): Promise<any> => {
    const res = await request("/projects", "POST", {
      data: {
        type: "projects",
        attributes: {
          name: "sol-panel",
          description: "SOL Panel Installation",
          environment: "development",
        },
      },
    });

    if (res.status !== 201) {
      console.error(res);
      return;
    }

    const data = await res.json();
    console.log("new project created", data.data[0].data[0]);
    return data.data[0].data[0];
  };

  const getUserData = async (): Promise<any> => {
    if (project === undefined) {
      return;
    }

    const res = await request(`/projects/${project.id}/user_data`, "GET");
    const data = await res.json();
    if (data.data.length > 0) {
      const existing = data.data.filter((ud: any) => {
        return atob(ud.attributes.content) === USERDATA;
      });
      console.log("existing userdata", existing[0]);
      return data.data[0];
    } else {
      return await createUserData();
    }
  };

  const createUserData = async (): Promise<any> => {
    if (project === undefined) {
      return;
    }

    const res = await request(`/projects/${project.id}/user_data`, "POST", {
      data: {
        type: "user_data",
        attributes: {
          description: "sol-panel.user-data",
          content: btoa(USERDATA),
        },
      },
    });

    const data = await res.json();
    console.log("userdata created", data.data);
    return data.data;
  };

  const getServer = async (): Promise<any> => {
    const res = await request(`/servers?filter[hostname]=solana-rpc`, "GET");
    const data = await res.json();
    console.log("server", data);
    if (data.data.length > 0) {
      return data.data[0];
    }
    return await createServer();
  };

  const createServer = async (): Promise<any> => {
    if (project == null) {
      console.log("this project", project);
      console.error("no project in createServer");
      return;
    }

    if (userdata == null) {
      console.error("no userdata in createServer");
      return;
    }

    const res = await request("/servers", "POST", {
      data: {
        type: "servers",
        attributes: {
          hostname: "solana-rpc",
          plan,
          operating_system: "ubuntu_22_04_x64_lts",
          site,
          project: project.id,
          user_data: userdata.id,
        },
      },
    });

    const data = await res.json();
    console.log("server created", data);
    return data.data.attributes;
  };

  const { connected } = useAgentContext();
  const intervalId = useRef<NodeJS.Timer>();

  useEffect(() => {
    const refresh = async (): Promise<void> => {
      if (project === undefined) {
        console.log("getting project");
        setProject(await getProject());
      }

      if (userdata === undefined) {
        setUserdata(await getUserData());
      }

      setServer(await getServer());
    };

    if (intervalId.current === undefined) {
      intervalId.current = setInterval(() => {
        return async (): Promise<void> => {
          await refresh();
          if (server?.attributes.status === "on") {
            clearInterval(intervalId.current);
            // onSuccess();
          }
        };
      }, 5000);
    }

    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, userdata, connected]);

  return (
    <div className="container col-span-6 items-stretch rounded-xl bg-neutral shadow-xl">
      <div className="flex w-full justify-center p-2">
        <button className="btn-secondary btn-sm btn mr-2 justify-start">Back</button>
        <DeployStatusBar server={server} project={project} userdata={userdata} />

        <button className="btn-primary btn-sm btn justify-end" disabled={true}>
          Retry
        </button>
      </div>
      <div className="flex w-full flex-col">
        <AgentContextProvider>
          <div className="grid grid-cols-1 bg-neutral-800 lg:grid-cols-3">
            {server != null && <ServerOverview server={server} />}
            {server != null && <AgentOverview server={server} />}
            {server != null && <SolanaOverview server={server} />}
          </div>
          {server != null && <AgentLogs url={`ws://${server?.attributes.primary_ipv4}:8910`} />}
        </AgentContextProvider>
      </div>
    </div>
  );
}
