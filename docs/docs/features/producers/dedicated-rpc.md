# Dedicated RPC

SOL Panel is designed with the idea of pulling in data from various Solana datasources.
Sometimes, however, there are use-cases where raw RPC access is required.
In these cases, SOL Panel can deploy a dedicated RPC node and automatically configure it for use
within pipelines.

## Prerequisites: Create a latitude.sh Account

Once you have SOL Panel running, you need to setup a data ingestion source. SOL Panel's suggested method is a dedicated RPC node.

Our sponsor Latitude will provide you (and us) with $200 if you sign up with this [referral code](https://www.latitude.sh/r/F221607B).

After you create an account, create an API Key and ensure it's added to the `.env` file you've copied during installation.

# Step 1: Configure

Navigate to `/setup` and select a location. You wil lsee the hourly price listed and can then click `Deploy` to start the process:

![Configure](https://github.com/trustless-engineering/sol-panel/blob/main/docs/screens/setup/configure.png?raw=true)

# Step 2: Deploy

After confirming your deployment, a new Solana RPC node will start to be deployed:

![Deploy](https://github.com/trustless-engineering/sol-panel/blob/main/docs/screens/setup/deploy.png?raw=true)

# Step 3: Enjoy

After the node starts, you can start sending RPC requests to `http://<node IP address>:8899`. This node will also be registered as a data source for your pipelines.
