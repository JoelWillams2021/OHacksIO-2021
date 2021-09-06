# OHacksIO 2021

This repo is for the [OHacksIO](https://ohacksio.org) hackathon.\
From our [DevPost submission](https://devpost.com/software/life-saver-y907we):

### Inspiration

Our inspiration came from some of our team members who are lifeguards. They work hard to ensure the safety of others and wanted to give other people the chance to do the same, and they brought up the concept of saving lives efficiently and reliably.

### What it does

Life Saver is a website that allows quick access to treatments for a variety of injuries and probable diagnoses based on symptoms, all courtesy of the Canadian First Aid Manual. To diagnose an issue, all it needs are the symptoms that can be entered using checkboxes and a snappy autocomplete system. Once a condition or injury has been identified, it allows the user to access the detailed treatment plan, along with links to further instructions and things to look out for in an emergency. On the flip side, where the user knows their condition, they can navigate to the Treatment tab and enter their condition, accompanied by the same crisp autocomplete, which will take you to the respective treatment plan.

### How we built it

Before coding, we discussed our idea and what we would need to make a polished product, like the autocomplete and simplistic UI, which would make using it easier during an emergency. Once started to code, we decided to not use a login system since that would be time-consuming for anyone who wanted to use the product. Using EJS, we ended up having the landing page the Diagnosis tab, since most people probably don't know what is wrong with them and would need to identify the cause of their pain first. We added a simple navigation bar, search tab and containers, one to display what symptoms they could check, another to display what symptoms they had already checked, and one to tell the user things that they should know if and when an ambulance arrived. We then compiled a large JSON file, which included the name of the condition, the symptoms, and the treatments to centralize the information and make it easier for the search boxes to access. Then, using a Javascript file, we created an autocomplete system, so that if any characters that the user entered matched a symptom, the checkbox would appear, and as soon as the box was checked, the choice would also appear in the container above the search box. Once that was finalized, we moved onto the treatment section, which uses the same autocomplete as before, except this time it used links as opposed to checkboxes, and redirected to a treatment page that would contain the proper instructions and links to other sources if need be.

### Challenges we ran into

One of the challenges we ran into was displaying symptoms or conditions that matched what was being typed in the search bar. To solve this problem we added an event listener on the search bar for the "keyup" event which allowed us to run a function every time someone pressed a key. The function compared the letters currently inputed in the search bar and only returned the symptoms/conditions which consisted of those letters. Another challenge we encountered was adding symptoms that were selected to the area above the search bar to display the currently selected symptoms. To solve this problem we created a function that adds the symptom that's selected to the above area and set the function to run every time a user checks or unchecks a symptom.

### Accomplishments that we're proud of

We were able to effectively synthesize a autocomplete model in a very short amount of time and made it fast enough to keep up with continuous user input. We are also proud that we were able to work together effectively and leverage each other's strengths to make a polished end product

### What we learned

We learned the importance of keeping things simple as over-complicating things only made the result more convoluted and harder to follow. We also learned how to be more efficient as we were able to work more smoothly, resulting in spare time which we used to make the website easier to use.

### What's next for Life Saver

Building upon the JSON containing the symptoms/conditions to make the site more comprehensive for a larger group of people, as well as adding more functionality in terms of faster response times and a larger range of treatments for more severe injuries.