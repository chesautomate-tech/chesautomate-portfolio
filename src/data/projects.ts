import lead from '@/assets/workflows/lead-reactivation.png';
import errors from '@/assets/workflows/error-alerts.png';
import make1 from '@/assets/workflows/make-1.png';
import make2 from '@/assets/workflows/make-2.png';
import make3 from '@/assets/workflows/make-3.png';
import make4 from '@/assets/workflows/make-4.png';
import zapier1 from '@/assets/workflows/zapier-1.png';
import zapier2 from '@/assets/workflows/zapier-2.png';
import zapier3 from '@/assets/workflows/zapier-3.png';
import zapier4 from '@/assets/workflows/zapier-4.png';
import n8n1 from '@/assets/workflows/n8n-1.png';
import n8n2 from '@/assets/workflows/n8n-2.png';
import ghl1 from '@/assets/workflows/ghl-1.png';
import ghl2 from '@/assets/workflows/ghl-2.png';
import ghl3 from '@/assets/workflows/ghl-3.png';
import ghl4 from '@/assets/workflows/ghl-4.png';
import ghl5 from '@/assets/workflows/ghl-5.png';
import ghl6 from '@/assets/workflows/ghl-6.png';
import ghl7 from '@/assets/workflows/ghl-7.png';
import ghl8 from '@/assets/workflows/ghl-8.png';
export type Platform='n8n'|'Make'|'Zapier'|'GoHighLevel';
export type Project={title:string;platform:Platform;image:string;description?:string;problem?:string;solution?:string;steps?:string[];tags?:string[];featured?:boolean;errorImage?:string};
export const projects:Project[]=[
{title:'AI-Powered Lead Reactivation',platform:'n8n',image:lead,errorImage:errors,featured:true,description:'Turn quiet leads into a new conversation with personalized outreach and AI-powered reply handling.',problem:'Inactive leads sit in a CRM while manual follow-up gets pushed aside.',solution:'A daily workflow retrieves sample leads from HubSpot, sends personalized check-ins, classifies incoming replies, and updates each contact’s status.',steps:['Retrieve and validate sample leads from a HubSpot segment.','Use Cohere AI to draft a check-in, send through Gmail, and record the sent status.','Classify replies as interested, question, not interested, or unclear.','Route responses, update HubSpot, and hand off to a person after two AI replies.'],tags:['HubSpot','Cohere AI','Gmail','Slack']},
{title:'Webhook Data Pipeline',platform:'Make',image:make1,featured:true,description:'Capture incoming data, process it, and route it to Google Sheets and email.',problem:'Information arrives in different formats and needs manual copying between tools.',solution:'A webhook starts a connected pipeline with Google Sheets, HTTP requests, JSON parsing, conditional routes, and Gmail.',steps:['Receive incoming information through a custom webhook.','Record data in Google Sheets and branch the workflow.','Process HTTP responses with JSON and text parsing.','Route processed information to Google Sheets or Gmail.'],tags:['Webhooks','Google Sheets','HTTP','Gmail']},
{title:'AI Content Repurposing',platform:'Zapier',image:zapier2,featured:true,description:'Give source content a second life with AI-assisted drafting and social publishing.',problem:'Reworking source content for multiple channels takes repetitive effort.',solution:'A Google Drive trigger starts a workflow with AI transcription and content generation, then branches into social publishing steps.',steps:['Pick up a source file from Google Drive and filter it.','Generate a transcription and content drafts with AI by Zapier.','Loop over the generated items and split them into paths.','Send the resulting posts to Facebook Pages and LinkedIn.'],tags:['Google Drive','AI by Zapier','LinkedIn']},
{title:'Gmail AI Processing',platform:'Make',image:make2},
{title:'Asana-Xero Integration',platform:'Make',image:make3},
{title:'Gmail AI Multi-Routing',platform:'Make',image:make4},
{title:'Lead Capture & Routing',platform:'Zapier',image:zapier1},
{title:'Asana CRM Automation',platform:'Zapier',image:zapier3},
{title:'Lead Enrichment Pipeline',platform:'Zapier',image:zapier4},
{title:'Workflow Example 1',platform:'n8n',image:n8n1},
{title:'Workflow Example 2',platform:'n8n',image:n8n2},
{title:'AI-Powered Lead Nurturing',platform:'GoHighLevel',image:ghl1},
{title:'AI Lead Processing',platform:'GoHighLevel',image:ghl2},
{title:'Stale Lead Cleanup',platform:'GoHighLevel',image:ghl3},
{title:'Smart Lead Engagement',platform:'GoHighLevel',image:ghl4},
{title:'Appointment Confirmation',platform:'GoHighLevel',image:ghl5},
{title:'No-Show Follow Up',platform:'GoHighLevel',image:ghl6},
{title:'Review Request Automation',platform:'GoHighLevel',image:ghl7},
{title:'Email Nurture Sequence',platform:'GoHighLevel',image:ghl8},
];
