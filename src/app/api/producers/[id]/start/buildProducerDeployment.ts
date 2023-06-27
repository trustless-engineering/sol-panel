import { type V1ConfigMap, type V1Deployment } from "@kubernetes/client-node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const buildProducerConfigMap = async (producerId: string): Promise<V1ConfigMap> => {
  const producer = await prisma.producer.findUnique({ where: { id: producerId } });

  if (!producer) {
    throw new Error(`Producer ${producerId} not found`);
  }

  return {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: `producer-${producer.id}`,
      namespace: "default",
      labels: {
        app: "sol-panel",
        component: "producer",
        id: producer.id,
      },
    },
    data: {
      "producer.json": JSON.stringify(producer),
    },
  };
};

export const buildProducerDeployment = async (producerId: string): Promise<V1Deployment> => {
  const producer = await prisma.producer.findUnique({ where: { id: producerId } });

  if (!producer) {
    throw new Error(`Producer ${producerId} not found`);
  }

  return {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: `producer-${producer.id}`,
      namespace: "default",
      labels: {
        app: "sol-panel",
        component: "producer",
        id: producer.id,
      },
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: {
          app: "sol-panel",
          component: "producer",
          id: producer.id,
        },
      },
      template: {
        metadata: {
          labels: {
            app: "sol-panel",
            component: "producer",
            id: producer.id,
          },
        },
        spec: {
          containers: [
            {
              name: "producer",
              image: "node:18.0.0-alpine3.14",
            },
          ],
        },
      },
    },
  };
};
