---
title: "AI Vibecheck, Q2 2025"
description: "I would like to keep my job please"
pubDate: "April 26 2025"
---

We're solidly in the [AI backlash backlash](https://maxread.substack.com/p/the-ai-backlash-backlash). Here are some thoughts about using large language model-based tooling (like [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), [Cursor](https://www.cursor.com/en) and [Goose](https://github.com/block/goose)) for software development in 2025.

### On determinism

One thing that drew me to computing in the first place was the sense that, however complex computers were, they were fundamentally understandable. [Computers aren't magic](https://speakerdeck.com/bcantrill/things-i-learned-the-hard-way?slide=9). I always find it extremely empowering when I can figure out a tricky bug by peeling back a few layers of abstraction.

LLMs are closer to magic. Unless I've missed some new development in interpretability, you can't stare at the matrices powering them to figure out _why_ a model has given you a certain response. If you're having trouble with a tool, the solution is fuzzy: try a different model; try to stuff more relevant code in the context window; IDK, have you tried writing your prompt in all caps or asking more nicely? I would find it frustrating to be responsible for the quality of such a system. Maybe [someone](https://www.distributional.com) will figure out how to make useful assertions about the quality of their output.

Nondeterminism isn't new: probabilistic data structures are useful, and everything these days is asynchronous and distributed and horrifyingly complex. But do we have to inject _more_ chaos into everything? I am heartened by newer tools that use LLMs to write a script or plan for invoking deterministic tools.

Also, just an aesthetic objection: dealing with tools that are confidently and cheerily wrong is annoying! Have some shame!

### AI as anti-expertise

LLM tools are great at creating greenfield, prototype apps. I support the democratization of software engineering: I'm excited for more people to try building software, even if they vibe-code their way to victory.

But some of the excitement around AI tools feels like it's trying to devalue software engineering broadly. If a CEO can clone a SaaS app in a few days, who needs those highly-paid engineers? Part of what I love about writing software is understanding a topic deeply and crafting something that will stand the test of time, and I think that will still require deep expertise.

There's undoubtedly some "kids these days" energy here -- people have long made similar arguments whenever a new technology makes the practice of programming more approachable. "_Real_ engineers write in assembly code." "How can you call yourself a programmer if you've never done manual memory management?" "These web developers are ruining the desktop with their Electron apps." I don't want to gatekeep software development.

I just hope that the vibe-coders still have curiosity about the systems they're building on top of. In the near future, I see a lot of haphazardly built software, in desperate need of people to understand and maintain it. Maybe not all that different from today.