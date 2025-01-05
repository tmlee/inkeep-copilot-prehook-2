# Copilot Prehook Template

A template for creating a endpoint that can be used to provide contextual data to enhance Support Copilot responses.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Finkeep%2Fcopilot-prehook-template&project-name=copilot-prehook-template&repository-name=copilot-prehook-template&env=INKEEP_SUPPORT_COPILOT_API_KEY&envDescription=API%20Key%20needed%20to%20authorize%20request)

## Features

- Serverless API endpoint for Inkeep Support Copilot
- TypeScript with Zod validation
- Zero-config Vercel deployment

## Quick Start

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Set the `INKEEP_SUPPORT_COPILOT_API_KEY` environment variable. You can use this cli command to generate an API key: `openssl rand -base64 30 | cut -c1-40`. This key will be used to authenticate requests to your endpoint from the Copilot prehook
4. Deploy the project

## API Endpoint

POST `/api`