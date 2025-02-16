# Create T3 App
This project is still in development, and some functionalities may be broken. I often update to the latest Next.js canary version, which can cause things to break, along with experimenting with the latest Next.js approaches.

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`. TRPC was removed as there aren't many dynamic data fetching needs in this project and there is no need for mobile app. For server side data fetching I use React Server Components.

## Technologies used
I have modified the original template to include the following technologies:
- [Next.js](https://nextjs.org/) - Using latest version - Next.js 15 RC including React 19 utilizing React compiler for best performance
- [supabase](https://supabase.io/) - Used as postgres database, authentication layer 
- [shadcn](https://ui.shadcn.com/) - Beautifully styled and highly customizable components
- [tailwindcss](https://tailwindcss.com/) - For styling
- [next-safe-action](https://next-safe-action.dev/) - For safe data mutations
- [zod](https://zod.dev/) - For schema validation
- [react-hook-form](https://react-hook-form.com/) - For form handling
- [next-intl](https://next-intl-docs.vercel.app/) - For internationalization
- [bun](https://bun.sh/) - For package management
- [next-themes](https://github.com/pacocoursey/next-themes) - For theme switching support

## Main philosophy
I wanted to create a project showcasing my skills using latest technologies in react ecosystem. I have tried to follow all the best practices, code it as clean as possible.

## Other
All the pages are fully responsive up to 320 px width following the WCAG spec. 

## Author notes

### Design
The main focus certainly wasn’t on the design of the page. I am not a designer by any means and didn’t even spend time drawing the layouts in Figma beforehand. I did just enough to make it look good and be usable by my standards :)

### Advertisements prefetch behavior
I have opted in for client side router prefetching of next 2 pages after loading the page - prefetching via link after entering the viewport of the page is often too late, the route won't be prefetched in time. I have used this prefetch for previous pages - usually they will be prefetched anyways, when navigating from the previous page, but this way I can ensure that the pages are prefetched even when the user enters the page directly. This is in my opinion the best compromise between performance and user experience.

### Dynamic segment and query params
Why dynamic segment for paging and not query params like for filtering?

Well, next.js has "interesting" behavior, ([Github discussion](https://github.com/vercel/next.js/issues/53543)), where updating the search params does not trigger suspense loading or loading.tsx page. You can force it to show suspense loading by explicitly defining suspense and providing key composed of search params. 

However, then the next problem occurs. Navigation between routes is still really bad experience, because the page can't be prefetched and you have to wait for the page to load every time you navigate to it. This creates the impression of "nothing is happening" when navigating between pages especially on slow connections. When done via dynamic segment route - next will now prefetch pages content until it finds a loading.tsx which will be prefetched also. Therefore, until on a really slow connection, the route with the loading skeleton will be prefetched and shown to the user.

After the filter change, the same problem occurs, however this is "fixed" by showing the loading indicator to user on filter button and not closing the filter dialog until the new route is fetched and rendered. I could show the same loading indicator for paging, however having the page prefetched is much better.

## License
This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license.

🔹 You are free to view, modify, and learn from the code.  
🚫 **Commercial use in any form is strictly prohibited** (including original or modified versions).  

Full license details: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

