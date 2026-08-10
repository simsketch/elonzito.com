# Peak Activity — Lead ML Engineer

## Role and scope at Peak Activity

From July 2025 to August 2026, Elon Zito was Lead ML Engineer at Peak Activity, working remotely from Delray Beach, Florida.

He led engineering for a Fortune 200 energy utility's treasury platform modernization, taking two AI systems from architecture to production and directing a distributed team of around ten engineers across Peak Activity, the client, and contract staff. He owned the architecture, sprint scope, code review, and compliance sign-off, and delivered into client-governed AWS and GCP environments through dual GitHub Actions and GitLab CI pipelines.

## Treasury platform — replacing spreadsheets with a system of record

The client's treasury organization tracked billions of dollars in project finance, syndicated and bilateral revolving credit facilities, term loans, and letters of credit across a collection of Excel workbooks.

Elon replaced that with a single governed system of record where lender allocations, fees, draws, covenants, and maturities live as structured, auditable data. The stack was Next.js 15 with the App Router on the front end, Django and Django REST Framework with PostgreSQL on the back end, deployed to AWS ECS Fargate and provisioned entirely with Terraform. Authentication used Microsoft Entra ID single sign-on with role-based permissions on every endpoint.

Unifying the data made real-time reporting possible: live liquidity, utilization, and maturity dashboards replaced manual quarterly roll-ups, so the treasury team sees available capacity and drawn balances as they currently stand rather than as of the last workbook.

## Intelligence Hub — an LLM analyst over the live portfolio

Elon built a streaming conversational analyst over the live treasury portfolio using Claude on AWS Bedrock, authenticated by IAM rather than API keys.

Its defining property is that every query tool executes as the requesting user and inherits the same authorization gate as the matching API endpoint, so the assistant can never surface a record its user is not cleared to see. It renders charts inline, and an administrator can configure which tools are available. Answer quality is checked by a graded evaluation harness that runs in CI.

## Market intelligence for quarterly planning

Lending banks send daily research and pricing emails. Elon built a pipeline that ingests them through AWS SES and synthesizes them with Claude into a single dated Market Intelligence Report, turning an inbox nobody had time to read into a standing input for rate and spread assumptions in quarterly planning.

He also made banking relationship management data-driven by tying lender, counterparty, and contact records directly to live deal economics — allocations, fees, roles, facility pricing, and interaction history — so relationship reviews are backed by the actual book rather than reconstructed by hand.

## No-code alerting and approval workflow

Elon designed an alerting engine that lets the treasury team author their own rules against admin-defined deal types with no deploy required. A filter-tree abstraction and a self-describing field registry drive the rule builder, and the compiler emits database query objects rather than SQL strings, which makes injection structurally impossible rather than merely defended against. A daily scheduled evaluator emits notifications on state transitions instead of on the fact that a record still matches.

He also built a maker-checker approval workflow with named approvers, plus signal-driven audit logging with a daily write-once archive under object lock and seven-year retention. That control satisfied the utility's internal audit and cyber requirements.

## Diligence portal — retrieval-augmented Q&A over deal rooms

Elon architected a retrieval-augmented question-answering system that collapsed mergers-and-acquisitions and project-finance due diligence from days of manual reading to minutes. Analysts ask questions in Salesforce and receive cited, source-grounded answers drawn from roughly three thousand documents per deal room across about twenty-five active deals.

The system runs on Google Cloud: Cloud Run services, Cloud Functions, Cloud Workflows, and Pub/Sub, with Cloud SQL and pgvector as the knowledge store, all provisioned by Terraform across three environments behind identity-aware proxy authentication federated to the corporate identity provider.

## How the diligence retrieval pipeline works

Documents are parsed by Pixtral Large, a multimodal model, so scanned contracts and site drawings that defeat plain text extraction are still usable. Text is chunked with page-aware windows so a citation resolves to a page a human can open, then embedded and stored in pgvector.

Retrieval is hybrid: dense vector search runs alongside lexical full-text ranking, and the two are fused with Reciprocal Rank Fusion. Results are then re-ranked by a source-authority and demand-weighted policy derived from an analysis of more than fourteen thousand files and roughly fourteen hundred historical analyst questions, so an executed power purchase agreement outranks a consultant summary that merely scores higher on raw similarity.

Two further mechanisms address failures that pure vector search cannot fix. A source-diversity floor guarantees the context window draws on several distinct documents, because a single long document can otherwise occupy every slot and crowd out shorter but equally relevant sources. And amendment-chain reconciliation demotes superseded contract clauses, guarantees the base agreement a slot, and labels each chunk with its position in the chain, so the model reads version semantics explicitly rather than inferring them.

## Multi-agent consensus and calibrated confidence

Rather than a debate round, the system generates several candidate answers independently and blind to one another, then reconciles them. That choice follows the 2025 literature showing independent generation plus post-hoc voting outperforms debate on both accuracy and cost, because debate suffers problem drift and quadratic token growth. Retrieval runs once and is shared across candidates, so token cost stays linear.

An LLM judge scores each candidate against a shared rubric, and a deterministic fact-normalization layer aligns claims by the evidence they cite rather than by string similarity, so genuine disagreement is distinguished from rephrasing. When the top two candidates are close in score but differ in content, the answer is annotated and every candidate is surfaced for a human to adjudicate against the cited documents.

Confidence is calibrated, not decorated. Raw inter-agent agreement is mapped through a monotonic curve fit by isotonic regression with Laplace smoothing against a human-labelled gold set, so a published confidence number predicts a low-edit answer rather than merely restating that the candidates agreed.

## Evaluation and governance

Elon built the evaluation program that gates releases. The LLM judge is scored against human labels using Cohen's kappa on the categorical grade as the headline metric, since exact-match agreement overstates a judge by ignoring chance, alongside Kendall's tau-b on the ordinal score and a signed bias measurement to quantify self-preference per deployed model. Version labels shown to the judge are neutral, which removes the self-recognition trigger that drives self-preference.

A self-improvement loop diagnoses what reviewers correct, per rubric dimension, and proposes revised prompts — but only as preview versions. It never promotes. Promotion runs through a fail-closed two-tier gate: deterministic fact and source checks against held-out deals decide pass or fail, while an advisory judge only annotates the report. No prompt reaches production on a model's own say-so.

Production quality is tracked in a BigQuery-backed metrics dashboard covering analyst time saved, answer-retention rate, LLM-judged edit severity, latency, cost per question, and citation and retrieval quality.

## Engineering practice

Elon built the AI-assisted engineering practice both programs run on: an automated code reviewer running Claude on Bedrock that gates every merge against a repository-specific review guide, reusable agent workflows for ticket-to-pull-request delivery, and living architectural knowledge bases treated as the source of truth.

He enforced test-driven development and a ports-and-adapters architecture where the entire cloud stack runs locally against Ollama and a local Postgres with no cloud credentials, which cut the feedback loop from minutes to seconds for the whole team.
