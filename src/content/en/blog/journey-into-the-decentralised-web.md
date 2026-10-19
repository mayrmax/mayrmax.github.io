---
title: "A journey into the decentralised web"
description: "Linked Data, Solid's data pods, a personal API, a digital soul and autonomous agents: notes from October 2018, written while I was looking for my master's thesis topic."
date: 2018-10-08T12:00:00.000Z
updated: 2026-10-19T12:00:00.000Z
translationKey: decentralised-web
tags:
  - Linked Data
  - Solid
  - Personal Data Stores
  - Decentralisation
note: "I wrote this in October 2018, while I was looking for the topic of my master's thesis on personal data stores, and first published it as five short posts. It stands here as it was written; only the paragraphs, a list and a few typos have been fixed."
---

A bit of background to why I started to write articles; if you are not interested in that story, jump to the next section.

Yesterday I started to explore topics for my master thesis. I have a strong web background, so I decided that I want to do something in that area. The first obvious choice was to create something utilising machine learning to provide more insight into existing data. For years this has been a goal of mine, as I was drafting ideas for interactive schoolbooks, notebooks, collaboration tools and so on. All these ideas somehow didn't work out because I was missing something.

Yesterday I finally found out what I was missing. It was so obvious, but it needed this spark to light the fire. That spark for me was the deep dive into Linked Data and the concept of data pods introduced by Solid.

## Linked Data

Linked Data describes a standard that allows machines to make meaning of a text. If I write a sentence like "London is the capital of England", you immediately know what London, capital and England mean. A machine doesn't have that knowledge and can do nothing "intelligent" with that sentence. With Linked Data the sentence would contain annotations and hints that tell a machine more about the entities and what they are. They would point the machine to more information about the entities and their relationships.

This might sound lame: why should I be interested in a machine understanding what I'm writing?

Well, I was thinking the same at the beginning, but then I imagined a schoolbook where I can hover over certain words and immediately get more details about that entity. In the same sentence I would hover over London, and the document could query a database on some web server and tell me that there are currently 8.13 million inhabitants, or that the city spans an area of 1,572 km². These are simple examples, but they give you an idea of what could be possible. In the future I could write an article about London that includes statistical data, but instead of writing the numbers as text I would add a hint to the document to fetch the current number from an online source.

Linked Data also makes it possible to query documents for information. We can ask the document for what we want instead of reading through countless pages.

## Data pods

Solid is an ecosystem from the company Inrupt, started by Tim Berners-Lee, the creator of the World Wide Web, with the goal of giving users back the control over their content and data and how that data is used.

The concept is easy: by storing our pictures, posts, likes and so on in a structured and well-described format, on a privately or publicly hosted server, we allow different apps to work on the same data. If a website needs our name, profile picture and email address to make a forum post, we could just give the website access to that data. The website would go to our data pod and grab what it needs, without us typing in anything.

Hosting data just to make signing up easier? I can do that with Facebook, Google, GitHub and a million sites already. Well, yes, but these websites use your data to show you ads, without any control over who has access to it. And this isn't just about owning data, it's about what we could do once we own it. We could easily switch websites if we don't like a change to the interface or if another website offers more. Most of us are on Facebook because our friends are there. If we could keep our friends and still see their feeds, some if not most of us would choose something different. With data pods we can do just that, with a mouse click.

But there is more:

- No more keeping data in sync across multiple websites and profiles.
- Sharing any information is as simple as it can be: the data is already online, we only need to give the person we want to share it with access to it.
- Freedom of speech: because you own the data, nobody can force you to delete something just because they don't like your opinion.

Once we take that step, there is no turning back. We will have full control and responsibility, and turn the web into a flourishing garden instead of a city with walled-off districts.

## A personal API

How can we, other people, apps and websites read and change that data? To access a specific piece of data we need its URL (Uniform Resource Locator), which identifies where the resource is located. A query for all my photos could be `max.solid.com/photos`. To get a specific photo or album, I extend the query to a more specific location, for example `max.solid.com/photos/holiday_spain`.

If that query is standardised, every app knows where to find my photos in my data pod and can show them to me. I could also place or generate something like a table of contents in a folder and query that document to find all the photos I took in Spain. The same works for documents: you store them in your pod instead of on your PC, in Dropbox, Google Drive or other services.

Solid also lets us listen to changes of a specific resource. We could, for example, add the songs we listen to in a month to a playlist for that month. Because that data is online, I can share the playlist with friends, and they get notified when something is added.

I hope your ideas have started to spark and you are already thinking of everything that becomes possible. Because everything is connected through Linked Data, there could be apps that recommend new songs just by looking at your music library. These apps would compete with each other to offer the best service and the most accurate recommendations.

You would also want to keep your health data in your pod, including the measurements and activities from your fitness tracker. You could then allow apps or even your doctor to access that data and give you recommendations to improve your health, automated and as personal as your saved preferences allow.

## A digital soul

We store our personal data in data pods and access it through some kind of API. But the more I think about it, the more a data pod looks like a digital soul, connected to the digital environment called the internet. It's personal, it consists of everything you do online, it represents you; it's a mirror that shows who you are online.

This is actually quite a scary thought. But most of that information is already stored on some company's server, without any insight for us. Only recently did we get access to some of it, at least as Europeans, through the GDPR. And you are only guaranteed the most basic raw data; most of the value is still locked away as a company secret.

A digital soul would also improve a lot of existing services. I, for one, never really warmed to voice assistants. I own an Amazon Echo and use Alexa to set alarms and play music. Siri, Google Home and Cortana all offer some kind of functionality, but they are neither smart nor personal. Future assistants could read and write to your digital soul, or even reply to conversations based on the data and insights they extract from it. They could provide real help: find things, make appointments and understand what you are talking about. Because they could also access your friends' calendars (if they share them with you), they could talk to other assistants and schedule activities. When you write to a friend, the assistant could remind you to ask about their new job, because it followed their feed and kept you up to date.

The possibilities are endless. The question that remains is whether we want a future like that, and how we can secure and protect our digital soul.

## Autonomous agents

Now comes one of the essential parts that will take the web to the next level.

There will be truly personal assistants that know you, your interests, your friends and even your family. They will gather data for you automatically, enrich it with context and link it into the new web. They will collect sports statistics and the news that interests you most, or look through new films and series and suggest them to you. They will try to find out what interests you most, and improve themselves through direct feedback and the indirect feedback of what you do in your daily life.

Imagine a future where you walk through the streets wearing smart devices that register what you look at. An autonomous agent might notice that you looked at a specific item for longer than usual. It might save that, crawl the web for variations of the item and suggest the shops where you would save the most if you decide to buy it.

That is actually not so different from what Google, Facebook and Amazon already do. What it comes down to, again, is ownership of that data and the direct feedback loop you have with your agents. You can delete, edit, update or add information whenever and wherever you like. Data is power, and because it's your data, you should be the one who decides what happens with it and who has access to it.
