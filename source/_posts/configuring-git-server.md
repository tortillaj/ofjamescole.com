---
title: Setup a Private Git Server
subtitle: Roll your own on Digital Ocean
date: 2013-05-11T17:35:50-04:00
comments: true
share: true
tags:
    - devops
    - git
categories:
    - Development
---

Of all version control systems, Git has proved most versatile and robust, at least for the needs of my employers and me. Currently, [Github](http://github.com) is by far the most popular hosted Git service, and is a wonderful way to make coding social or collaborate on someone else's project.

However, you may find yourself working on project that you want to keep private for a while, and you don&rsquo;t want to pay Github&rsquo;s service fees for whatever reason. In this case, you want a private Git repo and server.

Though there are hosted alternatives to Github that allow this, like [Bitbucket](http://bitbucket.org), this article outlines how to set one up on your private server provided by [Digital Ocean](https://www.digitalocean.com/?refcode=7b51e336e6a2).

+++

## Assumptions

This article demonstrates how to setup a Git server on one of Digital Ocean&rsquo;s Ubuntu droplets. However, the process should be similar for other Linux distros, excepting any distro specific commands.

It is also assumed your development machine uses Linux, OSX or some other UNIX variant. This article uses command line references, so hopefully you have some knowledge of that as well.

## Development Machine Setup

On the development machine, you&rsquo;ll want to create an SSH key from the command line.

``` bash
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pub
```

The second line spits out your SSH key. Take note of it for now and we&rsquo;ll add it to the server later.

## Server Setup

If you have a bare server that you&rsquo;ve never interacted with much, you&rsquo;ll want to setup SSH access. It&rsquo;s best to create a separate user to perform automated Git related actions, but I&rsquo;ll leave that up to you and your discretion for now.

### Configuring Access

With your SSH access, login to your remote server. Your credentials to achieve this are located in Digital Ocean&rsquo;s admin panel.

After logging in, add your SSH key generated above to your list of authorized keys. You can do that by using your text editor of choice (vim, nano, etc) and pasting your key inside the file.

``` bash
ssh server.com
vi ~/.ssh/authorized_keys
```


Since you&rsquo;ve added your development environment&rsquo;s SSH key here, you should be able to SSH in without entering your password. Try it out!

Next, pull in your updates then install Git. You may already have Git installed, and if so just skip this step. In case you&rsquo;re not positive if Git is installed, just run `which git` at the command line to find out. If it&rsquo;s installed, you&rsquo;ll get the installation location returned. If not, time to install it!

``` bash
sudo apt-get update
sudo apt-get install git-core
```

If you&rsquo;re using this server by yourself, then you&rsquo;re finished with the server setup. However, if you&rsquo;ll be working on a team with other folks, you&rsquo;ll want to do some additional configuration to allow that. This extra configuration is up to you, the reader, yet here are two resources to get started in that direction: [Gitosis](https://github.com/tv42/gitosis) and [Gitolite](https://github.com/sitaramc/gitolite).

### Configuring Repositories

Now that we&rsquo;ve configured server, it&rsquo;s time to create some repos! If you created a separate user for Git related activity, login as that user. Otherwise, you&rsquo;re ready to begin.

Change directories to your user&rsquo;s home. Then, create a repo using any name you want. Here, I just called it <code>repo.git</code>, but you can be as creative as you want!

Finally, change into this new Git directory and initialize a bare repository. That&rsquo;s it!

``` bash
cd ~
mkdir repo.git
cd !$
git --bare init
```

## Codebase Setup

It&rsquo;s now time to setup your codebase on your development machine. To start, exit from your server.

Change directories into your codebase. If you haven&rsquo;t created a Git repository here, go ahead and do that now. Make sure to add in your files too.

If you&rsquo;ve already created your Git repository, delete any origins in case they exist by running `git remote rm origin`. This is just a precaution to ensure everything is pushed to your personal server.

Next add your remote server and push in all your commit files. Note that the example uses `root` for the username, `server.com` for the server name or IP address (you can use either) and `repo.git` for the repository name. You&rsquo;ll want to use your own values there.

``` bash
git remote add origin root@server.com:repo.git
git push origin master
git config branch.master.remote origin
git config branch.master.merge refs/heads/master
```

The final two commands above simply set a default merge and remote.

** tl;dr **

Well, that wraps it up! I&rsquo;ve demonstrated here a quick and easy way to setup your own Git server, so that you can maintain a private repository without paying any more than you already do for hosting.
