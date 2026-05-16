/**
 * Core navigation signature pairing a visual nameplate with a deployment target route.
 */
export interface LabelLink {
    label: string;
    link: string;
}

/**
 * Extended data record for detail cards requiring inline summaries alongside target definitions.
 */
export interface LabelLinkDes {
    label: string;
    link: string;
    description: string;
}
