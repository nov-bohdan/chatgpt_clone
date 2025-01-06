import { Chat } from "../types";

export const mockChats: Chat[] = [
  {
    id: 1,
    title: "How to implement authentication in Next.js with Auth0",
    date: new Date("2025-01-06"), // today
    messages: [
      {
        id: 1,
        content: "How to implement authentication in Next.js with Auth0",
        role: "user",
      },
      {
        id: 2,
        content:
          "I'll help you implement authentication in Next.js using Auth0. First, you'll need to create an Auth0 account and set up your application. Would you like me to walk you through the process step by step?",
        role: "assistant",
      },
      {
        id: 3,
        content:
          "Yes, please walk me through the setup process. I've created an Auth0 account but I'm not sure what to do next.",
        role: "user",
      },
      {
        id: 4,
        content:
          "Great! Let's start with the configuration. First, go to your Auth0 dashboard and create a new application. Choose 'Regular Web Application' as the application type. Then, in your Next.js project, install the Auth0 SDK by running: npm install @auth0/nextjs-auth0",
        role: "assistant",
      },
      {
        id: 5,
        content:
          "I've installed the SDK. What configuration settings do I need to add to my Next.js application?",
        role: "user",
      },
      {
        id: 6,
        content:
          "You'll need to create a .env.local file in your project root and add these Auth0 environment variables: AUTH0_SECRET, AUTH0_BASE_URL, AUTH0_ISSUER_BASE_URL, and AUTH0_CLIENT_ID. You can find these values in your Auth0 dashboard. Would you like me to show you how to set up these variables?",
        role: "assistant",
      },
      {
        id: 7,
        content:
          "Yes, please show me the exact format for the environment variables and where to find each value in the Auth0 dashboard.",
        role: "user",
      },
    ],
  },
  {
    id: 2,
    title: "Building a responsive navigation menu with Tailwind CSS",
    date: new Date("2025-01-06"), // today
    messages: [
      {
        id: 1,
        content:
          "How do I create a responsive navigation menu using Tailwind CSS?",
        role: "user",
      },
      {
        id: 2,
        content:
          "I'll help you build a responsive navigation menu with Tailwind CSS. Would you like to start with a basic mobile-first approach?",
        role: "assistant",
      },
      {
        id: 3,
        content:
          "Yes, let's start with mobile-first. What's the best way to structure it?",
        role: "user",
      },
    ],
  },
  {
    id: 3,
    title: "Setting up a PostgreSQL database with Prisma",
    date: new Date("2025-01-06"), // today
    messages: [
      {
        id: 1,
        content:
          "What's the process for setting up PostgreSQL with Prisma in a Node.js application?",
        role: "user",
      },
      {
        id: 2,
        content:
          "I'll guide you through setting up PostgreSQL with Prisma. First, we'll need to install the necessary dependencies. Are you starting with a new project or adding to an existing one?",
        role: "assistant",
      },
      {
        id: 3,
        content:
          "I'm adding it to an existing project. What dependencies do I need?",
        role: "user",
      },
    ],
  },
  {
    id: 4,
    title: "Implementing dark mode with React and Tailwind",
    date: new Date("2025-01-05"), // yesterday
    messages: [
      {
        id: 1,
        content:
          "How can I add dark mode support to my React application using Tailwind CSS?",
        role: "user",
      },
      {
        id: 2,
        content:
          "I can help you implement dark mode using React and Tailwind CSS. We'll use Tailwind's dark mode feature along with React state management. Would you like to use system preferences or a manual toggle?",
        role: "assistant",
      },
      {
        id: 3,
        content: "I'd like to implement both options. Can you show me how?",
        role: "user",
      },
    ],
  },
  {
    id: 5,
    title: "Creating custom hooks in React",
    date: new Date("2025-01-05"), // yesterday
    messages: [
      {
        id: 1,
        content: "What's the best way to create and use custom hooks in React?",
        role: "user",
      },
      {
        id: 2,
        content:
          "I'll explain how to create custom hooks in React. Custom hooks are a powerful way to reuse stateful logic. Would you like to see an example of a simple custom hook first?",
        role: "assistant",
      },
      {
        id: 3,
        content: "Yes, please show me a basic example to get started.",
        role: "user",
      },
    ],
  },
  {
    id: 6,
    title: "Implementing infinite scroll with React Query",
    date: new Date("2025-01-05"), // yesterday
    messages: [
      {
        id: 1,
        content: "How do I implement infinite scroll using React Query?",
        role: "user",
      },
      {
        id: 2,
        content:
          "I'll help you implement infinite scroll with React Query. We'll use the useInfiniteQuery hook. Are you familiar with React Query basics?",
        role: "assistant",
      },
      {
        id: 3,
        content:
          "Yes, I've used React Query before but haven't worked with infinite queries.",
        role: "user",
      },
    ],
  },
  {
    id: 7,
    title: "Setting up Jest with TypeScript",
    date: new Date("2025-01-05"), // yesterday
    messages: [
      {
        id: 1,
        content: "What's the process for configuring Jest with TypeScript?",
        role: "user",
      },
      {
        id: 2,
        content:
          "I'll guide you through setting up Jest with TypeScript. We'll need to install some dependencies and create a configuration file. Would you like to start with the installation?",
        role: "assistant",
      },
      {
        id: 3,
        content:
          "Yes, please list all the required dependencies and configuration steps.",
        role: "user",
      },
    ],
  },
  {
    id: 8,
    title: "Understanding React Server Components",
    date: new Date("2025-01-02"), // older than 3 days
    messages: [
      {
        id: 1,
        content:
          "Can you explain what React Server Components are and their benefits?",
        role: "user",
      },
      {
        id: 2,
        content:
          "I'll help you understand React Server Components. They're a new feature that allows components to be rendered on the server. Would you like me to explain the key differences between Server and Client Components?",
        role: "assistant",
      },
    ],
  },
  {
    id: 9,
    title: "Optimizing Docker Images",
    date: new Date("2025-01-01"), // older than 3 days
    messages: [
      {
        id: 1,
        content: "What are the best practices for optimizing Docker images?",
        role: "user",
      },
      {
        id: 2,
        content:
          "I can help you optimize your Docker images. We'll cover multi-stage builds, layer caching, and minimizing image size. Shall we start with the basics of multi-stage builds?",
        role: "assistant",
      },
    ],
  },
  {
    id: 10,
    title: "GraphQL vs REST API Design",
    date: new Date("2024-12-30"), // older than 3 days
    messages: [
      {
        id: 1,
        content: "What are the main differences between GraphQL and REST APIs?",
        role: "user",
      },
      {
        id: 2,
        content:
          "I'll explain the key differences between GraphQL and REST APIs. Both have their use cases, but they solve API design challenges differently. Would you like to explore the advantages and disadvantages of each?",
        role: "assistant",
      },
    ],
  },
];
