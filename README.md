# Turbobase

I am not sure where this projet is going, but I am sure it will be fun.

## Goals

My first goal is to have it replace my default home/startup page in my browser. I want to have control over the user interface and be able to quickly access my favorite applications and websites. The content for this page should be stored in a file system and be easily editable.

As a next step I want turbobase to provide an interface to the file system and a simple way to create and manage data. Acting as a "base" for small web applications. For example a note taking application could be opened inside turbobase in an iframe. While the application runs on a different domain, it can still access the file system through the parent window.

## A feed controlled by me/you

A nice idea would be for Turbobase to become my own feed
where I set the rules and have control over what appears in my feed.

## Implementation

### File System

For now I will use the Dropbox API to provide access to a file system.

Authentication is stored in local storage and the access token is used to make requests to the Dropbox API.
