# This is my e-commerce website for my final week 8 assignment

Elegance — Static eCommerce Site
Elegance is a lightweight, responsive e-commerce front-end built with plain HTML, CSS, and JavaScript—no frameworks or build tools required.

Table of Contents
Project Overview

Live Demo

Features

Tech Stack

Folder Structure

Usage

Customization

Deployment

Project Overview
Elegance is a static storefront template showcasing:

A product gallery with filters

Modal product detail views

A shopping cart using browser storage

Responsive layout (mobile ↔ desktop)

CSS animations & transitions for interactivity

No backend—just drop it onto any static host or server and you’re live.

Live Demo
▶️ View it in your browser

Features
Product Gallery

Grid layout, hover effects, category filters

Product Modals

Click to open details (images, description, price, add to cart)

Shopping Cart

Add/remove items, quantity controls, total price

Uses localStorage to persist between sessions

Responsive Design

CSS Grid & Flexbox

Media queries for tablets & mobiles

Animations & Transitions

Smooth hover states, modal fade-ins, cart slide-out

Tech Stack
HTML5 for semantic structure

CSS3 (Flexbox, Grid, media queries, custom properties)

JavaScript for cart logic

No preprocessors, no bundlers—just drop into any static folder.

Folder Structure
bash
Copy
Edit
elegance/
├── assets/
│   ├── images/           # product and UI images
│   └── icons/            # SVG or icon files
├── css/
│   └── styles.css        # main stylesheet
├── js/
│   └── main.js           # product gallery + cart logic
├── index.html            # entry point
└── README.md\

Usage
Browse Products: Click category buttons or use the search bar.

View Details: Click any product card to open its modal.

Add to Cart: In the modal, choose quantity and click “Add to Cart.”

View/Update Cart: Click the cart icon to slide out the cart panel; adjust quantities or remove items.

Persistence: Your cart stays intact if you refresh or close/reopen the tab.

Deployment
You can host Elegance on any static-site provider:

GitHub Pages

Netlify

Vercel (Static Deployment)
