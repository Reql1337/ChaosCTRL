export const timelineData = [
    { name: '1 Jul', resolved: 28, newRequests: 38 },
    { name: '2 Jul', resolved: 32, newRequests: 46 },
    { name: '3 Jul', resolved: 20, newRequests: 55 },
    { name: '4 Jul', resolved: 34, newRequests: 44 },
    { name: '5 Jul', resolved: 54, newRequests: 42 },
    { name: '6 Jul', resolved: 54, newRequests: 60 },
    { name: '7 Jul', resolved: 15, newRequests: 38 },
    { name: '8 Jul', resolved: 34, newRequests: 43 },
    { name: '9 Jul', resolved: 25, newRequests: 32 },
    { name: '10 Jul', resolved: 44, newRequests: 48 },
    { name: '11 Jul', resolved: 34, newRequests: 46 },
    { name: '12 Jul', resolved: 58, newRequests: 54 },
];

export const velocityData = [
    { sprint: 'S1', committed: 40, completed: 35 },
    { sprint: 'S2', committed: 45, completed: 38 },
    { sprint: 'S3', committed: 45, completed: 42 },
    { sprint: 'S4', committed: 50, completed: 30 },
    { sprint: 'S5', committed: 40, completed: 38 },
    { sprint: 'S6', committed: 55, completed: 50 },
];

export const cumulativeFlowData = [
    { name: 'W1', todo: 20, inProgress: 5, done: 0 },
    { name: 'W2', todo: 35, inProgress: 15, done: 5 },
    { name: 'W3', todo: 25, inProgress: 25, done: 15 },
    { name: 'W4', todo: 15, inProgress: 20, done: 35 },
    { name: 'W5', todo: 10, inProgress: 15, done: 55 },
];

export const stakeholdersData = [
    {
        name: 'Sarah Miller',
        role: 'Head of Product',
        chaosScore: 12,
        requests: 5,
        approvalRate: 92,
        avatar: 'SM',
        history: [
            { id: 'REQ-204', title: 'Q3 Roadmap Adjustment', date: '2 days ago', status: 'Approved', score: 15 },
            { id: 'REQ-198', title: 'Analytics Dashboard Spec', date: '1 week ago', status: 'Approved', score: 10 },
            { id: 'REQ-182', title: 'User Profile Update', date: '2 weeks ago', status: 'Approved', score: 8 }
        ]
    },
    {
        name: 'Mike Ross',
        role: 'VP Sales',
        chaosScore: 88,
        requests: 14,
        approvalRate: 45,
        avatar: 'MR',
        history: [
            { id: 'REQ-209', title: 'Urgent: Custom Report for Client X', date: '4 hours ago', status: 'Pending', score: 92 },
            { id: 'REQ-205', title: 'Change Pricing Tier Logic', date: '3 days ago', status: 'Rejected', score: 85 },
            { id: 'REQ-199', title: 'Add "Demo" Button to Header', date: '1 week ago', status: 'Approved', score: 45 },
            { id: 'REQ-180', title: 'Salesforce Integration V2', date: '3 weeks ago', status: 'Rejected', score: 88 }
        ]
    },
    {
        name: 'Jessica Pearson',
        role: 'CEO',
        chaosScore: 45,
        requests: 3,
        approvalRate: 100,
        avatar: 'JP',
        history: [
            { id: 'REQ-210', title: 'Q4 Strategic Pivot', date: '1 day ago', status: 'Approved', score: 65 },
            { id: 'REQ-150', title: 'Rebrand Announcement Banner', date: '1 month ago', status: 'Approved', score: 25 }
        ]
    },
    {
        name: 'Louis Litt',
        role: 'Legal Counsel',
        chaosScore: 25,
        requests: 8,
        approvalRate: 80,
        avatar: 'LL',
        history: [
            { id: 'REQ-201', title: 'GDPR Compliance Modal', date: '5 days ago', status: 'Approved', score: 30 },
            { id: 'REQ-195', title: 'Terms of Service Update', date: '2 weeks ago', status: 'Approved', score: 20 }
        ]
    },
    {
        name: 'Harvey Specter',
        role: 'Strategic Partner',
        chaosScore: 65,
        requests: 7,
        approvalRate: 60,
        avatar: 'HS',
        history: [
            { id: 'REQ-208', title: 'Mobile App Refactor', date: '2 days ago', status: 'Rejected', score: 75 },
            { id: 'REQ-200', title: 'VIP Client Portal', date: '1 week ago', status: 'Pending', score: 60 }
        ]
    },
];
