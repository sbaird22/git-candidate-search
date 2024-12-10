// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    id: number;
    login: string; // GitHub username
    avatar_url: string; // Profile image URL
    html_url: string; // Link to GitHub profile
}