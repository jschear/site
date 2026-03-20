---
title: "First Steps with OCaml"
description: "First Steps with OCaml"
pubDate: "March 12 2024"
---

These days, everyone is talking about ML. They mean [Meta Language](<https://en.wikipedia.org/wiki/ML_(programming_language)>), right? (Let's pretend they do.)

Last year I attended the [Recurse Center](https://www.recurse.com/),[^1] a retreat for programmers, and one of my goals while at RC was to get more comfortable and productive writing in a functional programming language.

I was first exposed to the functional paradigm in college, while taking a programming languages course. At that time, my experience and understanding of programming were entirely influenced by Java and Python, and my poor uninitiated brain practically melted the first time we transformed an imperative loop into a recursive function. I finished that course excited about functional programming, but also intimidated by the jargon that came along with it (and these curly fellas: λ).

I've spent the past few years writing [Kotlin](https://kotlinlang.org/) (often using [RxJava](https://reactivex.io/)) in the context of an Android application, and have been increasingly convinced that many of the priorities of typed functional programming (using algebraic data types to model your domain, immutable data structures -- or at least judicious use of mutable state) are well-suited for developing software that is both understandable and evolvable. Even in languages that don't particularly encourage a functional style, limiting the use of mutable state minimizes implicit dependencies between parts of a program, making it easier to understand those parts in isolation and compose them without fear. And the general concepts seem to keep popping up in other areas I'm interested in, like [build systems](https://bazel.build/basics/artifact-based-builds#a_functional_perspective).

All that to say, I was eager to try out a more functional language. So why OCaml? Why not Haskell, Clojure, Scala, Elm, Scheme, Racket, Idris, Koka, Roc, Common Lisp?
- OCaml has proven industry usage inside of Jane Street and Facebook. Regardless of whether you'd want to work at one of these places, they definitely have a track record of writing software that accomplishes stuff in the real world. (Has side-effects?)
- OCaml has a pragmatic approach towards functional purity that I appreciate. You can reach for mutable state when you really need it, and evaluation is eager, so you don't have to learn a new evaluation strategy alongside a new language like you do with Haskell.
- I'd been vaguely following along with [the journey to add parallelism to OCaml](https://dl.acm.org/doi/10.1145/3408995) after hearing about it on Jane Street's [Signals and Threads podcast](https://signalsandthreads.com/), and wanted to better understand OCaml's runtime system.

For a more complete discussion of "Why OCaml" and how it compares to other popular languages, I'd recommend reading [this paper](https://queue.acm.org/detail.cfm?id=2038036) from Yaron Minsky of Jane Street (or watching [his similar talk](https://www.youtube.com/watch?v=v1CmGbOGb2I)).

## Tooling

One of my first priorities when learning a new language is setting up a comfortable development environment. Maybe I'm old fashioned -- I feel like the latest hotness is shoving all this stuff into a docker container or running it in the cloud somewhere -- but having a solid understanding of what tools are available, how they interact, and how to set them up on my machine is important to me.

### Package management

`opam` is the OCaml package manager[^3]. `opam` can manage multiple side-by-side installations of the OCaml compiler, in environments it calls "switches". So there's no need for a separate tool to manage multiple compiler versions like [`nvm`](https://github.com/nvm-sh/nvm) or [`rbnenv`](https://github.com/rbenv/rbenv) or [`pyenv`](https://github.com/pyenv/pyenv) or [`asdf`](https://asdf-vm.com/) or [`hermit`](https://cashapp.github.io/hermit/) or (if you've reached true enlightenment) [`nix`](https://nixos.org/).

My appreciation for the functional paradigm hasn't yet spread to my package management habits[^2], so on macOS I installed opam with `homebrew`, and followed the instructions it spit out to modify my shell environment.

```sh
$ brew install opam
```

### Building, creating a project

The most popular build system for OCaml is [dune](https://dune.readthedocs.io/en/latest/quick-start.html) (née `jbuilder`) created by (you guessed it) Jane Street. Dune itself is distributed as an `opam` package, so go ahead and install it:

```shell
$ opam install dune
```

One thing dune provides is an `init` command, which will create some reasonable project scaffolding:

```shell
$ dune init proj project_name
```

```shell
~/ocaml/
$ tree project_name
project_name
├── _build                    // Build artifacts. You'll want to .gitignore this.
│   └── log
├── bin                       // Where code for your application's entry point will live.
│   ├── dune
│   └── main.ml
├── dune-project              // Project-level dune configuration.
├── lib                       // Where library code will live. Create an .ml file in here to define a new module.
│   └── dune
├── project_name.opam         // An opam configuration file, should you ever want to publish your project. This is generated from the dune config.
└── test                      // Where test code will live.
    ├── dune
    └── test_project_name.ml
```

Last but not least, let's create a new switch.

```shell
opam switch create ./ 4.14.1 --deps-only
```

This creates a [local switch](https://opam.ocaml.org/blog/opam-local-switches/), i.e. one that is stored in an `_opam/` directory within the project instead of the default location. I prefer using local switches to isolate my project environments from one another, at the cost of having multiple installations of the toolchain on my machine.

### Editing

You can grab the ocaml LSP server and formatter with `opam`. You'll have to create an `.ocamlformat` file to activate the formatter.

```shell
opam install ocaml-lsp-server ocamlformat
touch .ocamlformat
```

If you're using VSCode, the [OCaml Platform Extension](https://marketplace.visualstudio.com/items?itemName=ocamllabs.ocaml-platform) will hook up the OCaml LSP to your editor, giving you type hints inline.

### The "standard" library

After writing a bit of code, I naturally found myself on Stack Overflow, the OCaml forums, and the OCaml discord, trying to find answers to my beginner questions. (I almost bothered a guy wearing a Jane Street shirt that I saw at the gym, but I resisted.) The first question experienced OCaml programmers seem to ask beginners who are soliciting help is "are you using `Base` and `Core`?" To the uninitiated, that sounds a lot like "are you using the standard library?"

One of the stranger aspects of the OCaml ecosystem is that it's sort of bifurcated into two worlds: code that uses the (standard) standard library, and code that uses Jane Street's `Base` and `Core` libraries, which are a wholesale replacement for the standard library. There are good reasons for following either path, and I don't feel particularly opinionated yet, but it's worth keeping this distinction in mind when encountering OCaml code in the wild or choosing libraries to use in your project. [More on this topic on OCamlverse.](http://ocamlverse.net/content/standard_libraries.html) There's also another popular stdlib-shaped library, [batteries](https://github.com/ocaml-batteries-team/batteries-included).


Lastly, a pile of helpful links:
- [The textbook for CS 3110 Data Structures and Functional Programming at Cornell.](https://cs3110.github.io/textbook/cover.html)
- [Real World OCaml](https://dev.realworldocaml.org/).
- [The OCaml lab from Stanford's CS242 Programming Languages class (Fall 2019)](https://stanford-cs242.github.io/f19/labs/ocaml).
- https://www.baturin.org/docs/ocaml-faq/
- https://borretti.me/article/two-years-ocaml
- https://osa1.net/posts/2023-04-24-ocaml-thoughts.html


[^1]: If you're reading this, it's extremely like that you either a) have already attended RC b) should apply to RC. [Do it!](https://www.recurse.com/apply)

[^2]: This was true at the time of writing, but now I've gone down the `nix` rabbit hole. Oops!

[^3]: There's also [esy](https://esy.sh/), and alternative package manager that appears to try to be a bit more friendly for those coming from the `npm`/`yarn` world. It also appears to encourage using lockfiles to pin dependencies which I certainly support, but it wanted me to install it via `npm` so I decided to stick with opam. If I was building a serious project in OCaml I'd probably reevaluate, and throw [Bazel](https://www.tweag.io/blog/2021-07-01-obazl/) in the ring too.
