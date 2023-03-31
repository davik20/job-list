

export interface Company {
    name: string;
    selector: string;
    url: string;
}

export const companies:Company[] = [

    {
        name: "Chainanalysis",
        selector: '.h5',
        url: "https://www.chainalysis.com/careers/job-openings/"
    },
    {
        name: "Ripple",
        selector: '[href*="/careers/all-jobs"] >:first-child',
        url: "https://ripple.com/careers/all-jobs/"
    },
    {
        name: "Open Sea",
        selector: `[data-qa*="posting-name"]`,
        url: "https://jobs.lever.co/OpenSea"
    },
    {
        name: "Nethermind",
        selector: `[data-mapped*="true"]`,
        url: "https://boards.eu.greenhouse.io/nethermind"
    }
]