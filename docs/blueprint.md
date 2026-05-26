# **App Name**: SheetsFlow Dynamic

## Core Features:

- Live Sheets Syncing: Fetch real-time company profiles, service lists, and social links directly from the configured Google Sheets App Script API.
- Dynamic Landing Generator: Auto-renders the landing page sections (Hero, About, Services, Contact) based on the current data structure found in the connected spreadsheet.
- Leads Intake Portal: An integrated contact modal with field validation to capture user enquiries and route them back to the spreadsheet database.
- Smart Copy Optimizer: A generative AI tool that suggests variations for the hero headline and subheadings based on the service data retrieved from Sheets.
- Contextual Scroll-Spy: Interactive navigation that automatically highlights active sections and enables smooth anchors using Next.js client routing.
- Feedback Response System: Visual confirmation system using modal states to alert users when their data has been successfully written to the cloud database.

## Style Guidelines:

- Primary color: Vivid Royal Blue (#2563EB) chosen for its association with professional cloud services and reliability.
- Background color: Ultra-light Slate Gray (#F8FAFC) to maintain the clean, corporate aesthetic required for data-driven dashboards.
- Accent: Deep Sky Indigo (#4F46E5) providing contrast for critical CTAs and section transitions.
- Font pairing: 'Poppins' for impactful headlines to provide a contemporary geometric look, paired with 'Inter' for body text to ensure maximum readability for service descriptions.
- Thin-line Font Awesome icons using consistent scaling to highlight service categories without overwhelming the text.
- Strict grid-based layout utilizing Tailwind CSS for a 'less is more' approach, emphasizing whitespace and logical information flow.
- Hover-scale transforms on service cards and subtle fade-in entrance for sections as they scroll into view.