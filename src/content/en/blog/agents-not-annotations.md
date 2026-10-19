---
title: "Agents, not annotations: grading my 2019 predictions"
description: "In 2019 I ended my master's thesis with a few guesses about where the web was heading. Seven years on: what came true, where I was wrong, and what I take from it for working with AI agents."
date: 2026-10-19T12:00:00.000Z
translationKey: agents-not-annotations
tags:
  - AI Agents
  - MCP
  - Personal Data Stores
  - Data Sovereignty
---

In 2019 I handed in my master's thesis at the University of Applied Sciences in Hagenberg. It was about personal data stores: places where your personal data lives with you rather than with the platforms that use it. I first built an app on [Solid](https://solidproject.org/), ran into its limits, and then built my own prototype, "Selfbox".

The last chapter is called "Future of the Web". In it I wrote down a few guesses about where the web was heading. I have now read it again, seven years later. Here is the honest scorecard, with the original quotes.

## Agents, not annotations

> The semantic web will not be based on semantic annotations on websites but on structured interfaces between servers where autonomous agents will interact with each other.

This is the prediction I am proudest of today. Back then, the idea of a semantic web still assumed that we would mark up web pages with meaning and machines would read them. I guessed it would turn out differently: that machines would not read pages but talk to each other through interfaces.

That is exactly what happened. AI agents now call tools through structured interfaces, and since late 2024 there has been an open standard for it, the Model Context Protocol (MCP). In December 2025 Anthropic handed it over to the Agentic AI Foundation under the Linux Foundation; ChatGPT, Gemini, Microsoft Copilot, VS Code and Cursor support it.

The annotations have not disappeared, by the way. Structured data following schema.org is in countless websites today, this one included, and I use it every day for technical SEO. It is just read mostly by search engines, not agents.

The part that has not quite come true is "interact with each other". So far, agents mostly work with servers on behalf of a person, not with one another.

**Verdict: right.**

## What I underestimated

I did not predict this one, but I built it without knowing what for. The hardest problem in Selfbox was not storage. It was how an unknown app connects to one of thousands of personal servers it has never seen before.

My answer was standard OAuth with three building blocks:

1. **Discovery:** every server describes itself at `/.well-known/openid-configuration`, and the app configures itself from that.
2. **Dynamic registration:** the app registers itself with the server, instead of a developer having to sign up manually with every single one.
3. **Scopes from the data model:** every data type automatically produced permissions such as `Movie:Read`, and you consented per app to what it was allowed to do.

That is precisely the problem MCP clients face today when they connect to arbitrary MCP servers. Authorisation in MCP is built on OAuth and uses the same building blocks. The June 2025 version of the specification still recommended dynamic registration; the November 2025 version prefers so-called Client ID Metadata Documents, where the app describes who it is at a URL of its own. The direction is the same.

The lesson: **with agents, the hard problem is not intelligence, it is who is allowed to do what.**

## The web gets more regulated and more fragmented

> If current trends continue, then the web will be more regulated as it is now and possibly even more separated as developments in authoritarian states show.

Not a bold call, but a correct one. Since 2019 the EU has added the Digital Services Act, the Digital Markets Act, the AI Act and the Data Act, most of whose provisions have applied since September 2025. By the end of 2026 every member state has to offer a digital identity wallet; in Austria, ID Austria is meant to become one.

In the same paragraph I also wrote that some governments were calling for rules that would force people to give up their privacy. The debate about so-called chat control shows that this was not exaggerated either.

**Verdict: right.**

## WhatsApp shows ads

I mentioned back then that WhatsApp planned to bring targeted advertising into the app. In June 2025 Meta announced it: ads in the Status section, with private chats meant to stay ad-free.

**Verdict: right.** Only the consequence I drew from it did not happen. See the next point.

## Centralised platforms lose to decentralised apps

> This promise slows down the change but can not stop it as centralized platforms cannot compete with decentralized applications.

Here I was wrong. The big platforms kept their users, and AI has concentrated power further, if anything: whoever has the most data and the most computing power builds the best models.

The interesting part is that the right answer was already in the same chapter. About decentralised services I wrote:

> These services are currently uncomfortable to use.

That was the point. Convenience beats principles. A service that protects your privacy but is more awkward to use only wins over the people who are already convinced.

**Verdict: wrong.**

## Blockchain becomes Web 3.0

I described Bitcoin, Ethereum and decentralised apps as the next generation of the web, and claimed that decentralised storage would outperform existing solutions on cost, redundancy and security by a factor of ten.

That did not happen. After the hype around 2021, decentralised apps stayed a niche, and crypto is mostly a financial topic. My own projects run on perfectly ordinary servers today; this website, for example, at Hetzner in Nuremberg.

What is left of the idea looks different from what I imagined in 2019. To me, decentralised today does not mean blockchain. It means: not everything sits with three US corporations. Open software, self-hosted with European providers, using tools such as Coolify that make it almost as convenient as the big clouds.

**Verdict: wrong.**

## Graphs are future-proof

> Representing data in its natural form, in a semantic way, using relationships and nodes in a graph provides a future proof solution and allows semantic exploration.

Selfbox stored everything in a graph database (Neo4j). For personal data, which is made of relationships, that was right. And graphs really are back with AI: knowledge graphs help language models find connections that a plain text search misses.

But "future-proof" was too big a word. For most projects a good relational database is enough. At malsati I even took Neo4j out again; everything there runs on PostgreSQL now.

**Verdict: partly.**

## Personal data stores go mainstream

> If PDS will ever reach mainstream is unknown.

Here, at least, I was careful. Solid is still around: since October 2024 the Open Data Institute has been its steward, and part of it is being standardised at the W3C as Linked Web Storage. It has not reached most people's everyday lives.

Part of the idea is arriving anyway, by a different route: regulation. The EU wallet is a piece of "your identity lives with you", the Data Act a piece of "your data belongs to you".

And in the description of Selfbox I predicted that, with your data in one place, an AI could get to know you quickly without being trained laboriously. That is happening right now: assistants remember things about you and access your data through interfaces. Only that data lives with the platforms. So the problem my whole thesis revolved around is not solved. AI has made it more urgent.

**Verdict: open.**

## The scorecard

| Prediction from 2019                                | Verdict |
| --------------------------------------------------- | ------- |
| Agents talk through interfaces, not annotations     | right   |
| The web gets more regulated and more fragmented     | right   |
| WhatsApp shows ads                                  | right   |
| Centralised platforms lose to decentralised apps    | wrong   |
| Blockchain and decentralised storage become Web 3.0 | wrong   |
| Graphs are future-proof                             | partly  |
| Personal data stores go mainstream                  | open    |

Three hits, two misses, one draw, one open question. What I find more interesting than the score is the pattern: I was right where I looked at technology and regulation, and wrong where I bet on how people behave.

## What I take from it

When I integrate AI agents into existing systems today, these are exactly the three lessons:

- **Interfaces beat semantics.** An agent is only as good as the interfaces it can use. Clean, well-described APIs are the best preparation for AI.
- **Permissions are the real problem.** An agent working for a person may only see what that person may see. That belongs in the architecture, not in the prompt.
- **Convenience decides.** Privacy and European hosting only win if they are not more awkward. That is the bar I hold my own solutions to.

The text where all of this started in 2018 is still here, by the way: [A journey into the decentralised web](/blog/journey-into-the-decentralised-web).
