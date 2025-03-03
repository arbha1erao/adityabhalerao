const contributions = [
    {
        title: "redis/rueidis",
        link: "https://github.com/redis/rueidis",
        summary: "A fast Golang Redis client that supports Client Side Caching, Auto Pipelining, Generics OM, RedisJSON, RedisBloom, RediSearch, etc.",
        prs: [
            { kind: "[PR/Feature]", title: "Implemented LCS (Longest Common Substring) Command", link: "https://github.com/redis/rueidis/pull/767" },
            { kind: "[PR/Bug]", title: "Ensure AUTH Command is Sent Before HELLO in NewClient Initialization", link: "https://github.com/redis/rueidis/pull/791" },
        ],
    },
    {
        title: "DiceDB/dice",
        link: "https://github.com/DiceDB/dice",
        summary: "DiceDB is an open-source in-memory database with query subscriptions.",
        prs: [
            { kind: "[PR/Feature]", title: "Add APPEND Command to DiceDB with Redis-like Behavior, Tests, and Benchmarking", link: "https://github.com/DiceDB/dice/pull/759" },
            { kind: "[Issue]", title: "Reported Inconsistent MSET Command Behavior", link: "https://github.com/DiceDB/dice/issues/516" },
        ],
    },
];

export default contributions;
