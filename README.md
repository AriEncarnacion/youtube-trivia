<img width="938" alt="youtube-trivia-logo" src="https://github.com/AriEncarnacion/youtube-trivia/assets/48712583/599df377-d5a0-4511-9a00-3f67fc4d118b">

**_Note: App is only optomized for videos ~5min or less. You can try longer ones, but Vercel's systems may time out. If you get an infinite loading screen, it's probably an unhandled `504 gateway timeout`. Try again with a shorter video._**
# YoutubeTrivia - [Live Here! :)](https://youtube-trivia.vercel.app/)
A relatively simple app that creates a quiz for a user and grades it using OpenAI API. This is basically a feature set clone of https://www.fastquiz.app/.

If you're curious about any of the implementation in this app, feel free to reach out to me at my [LinkedIn](https://www.linkedin.com/in/ariel-encarnacion/)! (:

### Improvements compared to fastquiz:
* FastQuiz isn't mobile friendly
  * YoutubeTrivia is! 
* FastQuiz allows the user to respond in a chat box, but it makes the interface buggy and messy. Use for the chatbox UI is unclear.
  * YoutubeTrivia provides no chatbox. All AI API calls are made purely in the backend. This keeps UX clear and intuitive.
* FastQuiz frequently returns multiple choice questions with no correct answers.
  * YoutubeTrivia leverages OpenAI Functions. This system nearly guarantees the questions will always have one correct answer
* FastQuiz occasionally evaluates a completely correct free answer question as "partially correct".
  * YoutubeTrivia isn't the best grader, but if you put in a comprehensive answer, the score is often high
* FastQuiz opts for a "correct, partially correct, incorrect" system that makes evaluations muddy and confusing
  * YoutubeTrivia uses a 0-100 score system, color coded based on the score. This gives the user more insight into how their answer performed.

### Known Bugs
* Request to AI API gets called twice and resolves twice. This might refresh the quiz a few seconds after its initial render.
  * **Resolution** - Likely due to an improper use of useEffect or improper strategy implemented when researching different ways to implent AI.
  
### Possible Improvements
 * Error handling !!
 * A ton of code cleanup and standardization of TailwindCSS. I like Tailwind but it does get messy if not organized properly.
 * More transitions for CSS resizing
 * More granular styling for different screen sizes
 * Saveable sessions via DB, using a non-secure custom key (Like FastQuiz, when2meet, etc)
 * Add Youtube video embedding to give the user a chance to study before taking the quiz
 * Improvements to model response speed via streaming (when streamed objects become usable, currently they're unstable at best)
 * Fine-tuning/prompt engineering to improve model response quality

### Observational notes while completing this project
* OpenAI API implemented via Vercel AI SDK. Makes for clean code, but I feel the responses from OpenAI API Native SDK were faster.
* Quizzes and scripts are saved to DB. Adding full auth functionality and quiz retrieval is a simple extension.
* Dark/Light/System Mode toggle because my poor developer eyes hurt
* shadcn/ui and TailwindCSS make for a great combo to just throw things down and make em look nice.
* NextJS 14 App Router makes setting up routes intu

### Tech Stack
Big thank you to all the teams that make these great products!
* [Nextjs 14 (App Router)](https://nextjs.org/docs)
* [shadcn/ui](https://ui.shadcn.com/)
* [TailwindCSS](https://tailwindcss.com/)
* [OpenAI API Native SDK](https://platform.openai.com/docs/overview) _(@ OpenAI Please implement a dark mode for the docs... we all want it)_
* [Vercel's AI SDK](https://sdk.vercel.ai/docs/introduction) _(@ Vercel why are these docs pure white..? Is this an AI SDK specific thing? Did I miss a trend?)_
