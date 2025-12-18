export default {
    apps: [
      {
        name: "react-vite-prod",
        script: "npm",
        args: "run start:pm2",
        cwd: "/home/debian/examen-ia-m2/front",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  