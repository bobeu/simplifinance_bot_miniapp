# Simplifinanc AI-Agent/Integration
![bannersimplifi](https://github.com/user-attachments/assets/386f315d-4abf-47bd-9a4d-99d7c0a0f1a7)

Simplifinance AI-powered Agent

Simplifinance provides users with multiple loan faucets with full control of their liquidity to maximize capital efficiency. Our MVP, FlexPool, is a customized liquidity pool for short-term crypto loan services focusing on all categories of users. 

## How FlexPool works
![ob2](https://github.com/user-attachments/assets/e806c380-96e5-4557-a076-dac58238dca9)

Flexpool emphasizes true decentralization, user control, and healthy loan competition to accommodate lower-class to middle-class users. Through liquidity synergy, users can create a large pool of funds with little or no interest, rotate it in form or loan it among themselves, invest their collaterals via the __Yield__ dashboard, and share the proceeds accordingly. The liquidity generated in a pool is accessible only to the contributors. You can view FlexPool as a form of loan equity where users provide only a part of the aggregate loan (based on the expected number of contributors) to access the total contributed amounts in the form of borrowed funds payable within a short period, usually between 1 to 30 days. FlexPools are owned and controlled by the users, not us.


## Project structure

The project is split into two main categories:
- __[Action Based - repo](https://github.com/simplifinance/simplifi)__ : Usual way to interact with an application through a call-to-action such as clicking a button to get response (s). Github __[repo](https://github.com/simplifinance/simplifi)__. Interact __[here](https://testnet.simplifinance.xyz)__

- __[AI Assist - repo](https://github.com/bobeu/simplifinance_bot_miniapp)__ : This a text-based mode of interacting with the Simplifinance's backend via AI agent. The Agent can connect and perform read and write access to the Simplifi's backend on behalf of the user using text prompts. Currently, we are working to improve the quality of the UI for this category. You can find the demo __[here]()__.

- contracts
    - contracts - (smart contracts)
    - deploy - (Deployment code)
    - deployments (Only available after running deployment command in __package.json__)
    - ignition (Not relevant)
    - test (Test files)
    - typechain-types (Available only after compile e.g. yarn compile)
    - env.local (Environment variable sample)
    - gitignore 
    - hardhat.config.ts
    - LICENSE
    - tsconfig.json
    - yarn.lock
- ui
    - apis (Backend files: OpenAI and Safe wallet configurations and tools)
        - openai
        - read
        - safe
        - update
        - utils
        - abis.ts
        - viemClient.ts
    - components
        - AppProvider (Wallet configuration)
        - ConnectWallet (Connect wallet button)
        - ErrorBoundary (Error catching)
        - Layout
        - MotionDivWrap
        - OnboardScreen
        - App.tsx
        - CustomButton.tsx
        - Message.tsx
    - deployments (copied folder from contracts)
    - fonts
    - pages
    - styles
    - env.example
    - eslintrc.json
    - gitignore
    - interfaces (types)
    - LICENSE
    - next.config.mjs
    - package.json
    - postcss.config.js
    - README.md
    - tailwind.config.ts
    - tsconfig.json
    - utilitie.ys
    - yarn.lock

# How to run

## Contracts
- Clone the repository

run:
```
    cd contracts
```

```
    yarn install
```

```
    yarn compile
```

Deploy locally to Hardhat built-in VM engine
```
    yarn deploy
```

Deploy to Celo testnet
```
    yarn deploy-alfa
```

## UI

- Clone the repository

```
    cd ui
```

Install dependencies
```
    yarn install
```

Run development server
```
    yarn run dev
```

Build
```
    yarn run build
```


# Relevant Links

- __[Webiste](https://simplifinance.xyz)__
- __[Testnet live](https://testnet.simplifinance.xyz)__
- __[Documentation](https://simplifinance.gitbook.io/docs/)__
