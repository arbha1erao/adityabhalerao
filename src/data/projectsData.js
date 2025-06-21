const projects = [
  {
    title: "CohereDB",
    description: "A distributed key-value database implementing consistent hashing and dynamic data server management across multiple nodes.",
    technologies: ["Go", "gRPC", "BadgerDB", "Protocol Buffers", "Consistent Hashing"],
    images: {
      light: "/coheredb-light.png",
      dark: "/coheredb-dark.png"
    },
    github: "https://github.com/arbhalerao/cohereDB",
    demo: "",
    features: [
      "Consistent hashing algorithm for even data distribution across nodes",
      "Automatic service discovery and server registration via HTTP API",
      "Health monitoring with automatic failure detection and node removal",
      "gRPC-based high-performance client-server communication",
      "CLI client for easy database operations and cluster management",
      "BadgerDB integration for persistent local storage on each node"
    ],
  }
];

export default projects;
