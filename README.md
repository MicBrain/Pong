# Pong
====

#### Content

1. Problem 
2. Suggested Solution 
3. Idea 
4. Pong
5. Description of the Software Tool
6. Advantages of this tool
7. Like it/Hate it 


#### Problem

Cloud security, server protection, and vulnerability detection are some of the most important tasks for every system and/or security administrator. There are a number of security issues and concerns associated with cloud computing, servers, and websites. There is always some chance that small bugs or typos in a big program will cause system anomalies, which can result in undesirable side effects. Trying to regularly monitor systems work can be a very time-consuming and technically challenging task. Moreover, it is unreasonable for administrators to manually check system activity and detect bugs. Trying to overcome that difficulty in a standard way creates different types of technical challenges, which can be very overwhelming. What if there was a software tool which could complete all those tasks automatically and inform the administrator or even the user of the software system if there was some kind of anomaly?


#### Suggested Solution

In order to solve this problematic issue, one might suggest an automatic procedure that can regularly analyze the server/website and try to detect any kind of irregularities. When the tool detects any kind of anomaly it immediately contacts the administrator/user to inform them about the problem. Generally, software services contact the administrator/user with email notifications. Pong, however, uses a more convenient method, by sending messages to the administrator's/user's phone about the detected problem. The administrator/user can choose the most convenient method for notifications (email or text message).

#### Idea

The idea of this software tool was born during the Cal Hacks Hackathon (October 3-5, 2014) at University of California, Berkeley. The software, which was developed by The Hill of Fingers team, is designed to solve the problem discussed above. After researching the general idea of the popular software tool called Ping (Ping is a free software Linux-based live CD ISO image built upon the Partimage and Linux From Scratch (LFS) projects for disk cloning or backup purposes), the team decided to make another PaaS and SaaS tool to increase the efficiency of work with various servers and websites. The project in this repository (httpsgithub.comRafa1994Pong) is the initial beta version of the tool. The team is planning to continue the development of this tool and make it more advanced and increase its functional in the near future.

#### Pong

Website - https://pong-c9-mahnerak.c9.io/login

Source  - https://github.com/MicBrain/Pong

#### Description of the Software Tool


Pong is a tool for analyzing and monitoring changes in servers and websites. Ping can be used daily by administrators and users to help understand the mysterious behavior of their systems. You can find the Beta version of the software here https://pong-c9-mahnerak.c9.io/login . The effectiveness of this tool depends on the fact that it constantly tries to virtually keep in touch with its users. One of the main goals of this project is to check the functionality of various servers and websites. When the program finds that one of the functionalities of the server/website is working incorrectly (e.g. the return value of a function is different from the desired output of that function), it automatically notifies the administrator. When the administrator wants to check the functionality of one method, they can provide the testing function for checking the generated results of the tested method and the software can do the remaining work by constantly (every 5 sec.) checking the outputs of the method. If Pong finds out that there is a contradiction it automatically sends a message to administrator about the problem. Pong can also be used to understand the execution time of different parts of the system. 

Another important goal of this project is to inform about the executed updates in the system to the administrator. If the administrator wants to be informed about the changes in the status of some functionality, Pong can automatically check for updates and inform the administrator if a change is detected. The initial version of this program may contain small bugs, because it was written during hackathon. However, the next versions of this tool will be fixed these issues. We are also planning to add other functionality, stay tuned. We are also thinking about developing a browser extension for Pong.

#### Advantages of this tool

Some instances where Pong can be very useful.

1. Finding system anomalies - The main task of Pong is to help the administrator find bugs that are difficult to find manually. The examples described in Description of the Software Tool provide more detail about the different types of monitoring tasks Pong can handle.


2. Getting updates from a your Website/Blog - Pong helps to you get an information about the updates in the fastest way, by sending a message to your phone. 

3. Tracking the Shipping Updates - Let's say a user wants to keep track of an item which should be shipped from location A to location D, and there are some other locations between A and D, named B and C. If our user wants to get notified when the item reaches location B, he/she can simply use Pong. When the item reaches point B there will be a system update and the user will get a message that the item is already in location B.


#### Like it/Hate it

For comments and/or suggestions please contact Rafayel Mkrtchyan (rafamian@berkeley.edu).
