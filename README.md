SINGH, SHIVAM <SHIVAM.SINGH2@amd.com>
	
5:37 PM (2 hours ago)
	
	
to me

[AMD Official Use Only - AMD Internal Distribution Only]

# ACAS DevOps Portal - Presentation Script

 

## Introduction (2 minutes)

 

**Opening:**

> "Hi everyone! Thank you Abhilash, Naveen, and TD for giving me this opportunity to present today.

> 

> I'm excited to introduce the **ACAS DevOps Portal** - a centralized monitoring and management platform designed to help our team with high-level CI/CD monitoring, build insights, documentation management, and consolidating all our important links in one place."

 

---

 

## Portal Overview (2 minutes)

 

**Navigation Structure:**

> "Let me walk you through the portal's structure. On the left sidebar, you'll see multiple sections organized by function:

> 

> - **Tools** - Quick access to PACT, KVM, Rancher, Build Comparison, PR Search, TA Analyzer, and XOAH

> - **Product CI** - Ryzen-AI, VAI, and ZenAI pipeline monitoring

> - **Monitoring** - Dashboard, Jenkins Runners, Grafana, K8s, Loki, and Storage monitoring

> - **Legal & Security** - Legal, Vulnerability, Coverity, Keywords, USI, and Copyright scans

> - **Resources & Support** - Documentation and Jira access"

 

---

 

## Dashboard Overview (3 minutes)

 

**Main Dashboard:**

> "Starting with the Dashboard, you'll see two main tabs: **Ryzen-AI** and **VAI**.

> 

> Let me focus on the Ryzen-AI dashboard first. Here we have two sections:

> - **Main** - All major CI pipelines for Ryzen-AI main branch

> - **Release** - All major CI pipelines for the release branch"

 

**Color Coding System:**

> "We use an intuitive color-coding system for quick status identification:

> - 🟢 **Green** - CI pipeline passed successfully

> - 🟠 **Orange** - CI pipeline currently running

> - 🔴 **Red** - CI pipeline failed

> - ⚫ **Gray** - CI pipeline was aborted"

 

**Link Strategy:**

> "Each CI component card provides three strategic links:

> 1. **Component Name** - Redirects to all main builds

> 2. **Build Number** - Redirects to that specific running build

> 3. **Stable Badge** - Redirects to the last successful/stable build

> 

> This same pattern applies to all components in both Main and Release sections."

 

**[PAUSE FOR QUESTIONS]**

 

---

 

## Analytics & KPIs (3 minutes)

 

**High-Level KPIs:**

> "In the second tab, we have comprehensive analytics for both Main and Release branches.

> 

> At the top, you'll find **Historical Analysis** - an aggregated view of all main components. You can select different date ranges for better insights."

 

**Demo:**

> "Let me demonstrate - if I select '7 days', you can see:

> - **Build Summary** - Overview of pass/fail rates

> - **Failed by Component** - Which components are failing most

> - **Average Build Time** - Aggregated across all components"

 

**Component-Level Analytics:**

> "Below, we have component-wise breakdowns including:

> - Status distribution charts

> - Build summary and average build times

> - Last 10 builds history

> - Historic success rate trends

> - Build time analysis

> 

> At the bottom, there's a **Component Matrix Analysis** for cross-component insights.

> 

> The same analytics structure is available for the Release branch."

 

**[PAUSE FOR QUESTIONS]**

 

---

 

## TA Analyzer Tool (3 minutes)

 

**Introduction:**

> "Now let me show you one of our powerful tools - the **TA Analyzer**.

> 

> This tool provides detailed information about Ryzen-AI Test Artifacts, including which EP (Endpoint) components are picked up by each TA build."

 

**Demo:**

> "You can select:

> - **Version** - Choose between different RAI versions

> - **TA Build Number** - Select specific TA runner builds

> 

> Once selected, you'll see:

> - Complete TA information and which EP it includes

> - Wheel file details and versions

> - How old each wheel file is that was picked up by the TA build

> 

> This gives you complete traceability of your test artifacts."

 

**[PAUSE FOR QUESTIONS]**

 

---

 

## Product CI Section (2 minutes)

 

**Ryzen-AI CI Pipelines:**

> "In the Product CI section, let's look at Ryzen-AI. We have two tabs:

> 

> 1. **CI Pipelines** - All CI/CD pipeline links organized with repository information

> 2. **Nightly Regression** - Real-time regression test status including:

>    - Last run time (e.g., '2 hours ago', '1 day ago')

>    - Build status and duration

>    - **Dynamic XOAH links** - Automatically extracted from Jenkins console logs

>    - Direct console output access

> 

> This gives you instant visibility into regression test health."

 

---

 

## Additional Features (2 minutes)

 

**Multi-Product Support:**

> "We have similar comprehensive views for VAI and ZenAI products, which you can explore in the respective tabs."

 

**Confluence Documentation:**

> "We also have a **centralized Confluence page** feature where you can:

> - Store and organize all team documentation links

> - Easily search across all pages

> - Add, update, and categorize documentation

> - Mark pages as featured for quick access"

 

---

 

## Handover (1 minute)

 

> "Before I hand over to Bharat to explain the **Jenkins Runners** monitoring feature, are there any questions about what we've covered so far?"

 

**[FINAL Q&A]**

 

> "Thank you! Now I'll hand over to Bharat who will walk you through the Jenkins Runners monitoring capabilities."

 

---

 

## Key Highlights Summary

 

| Feature | Benefit |

|---------|---------|

| Centralized Dashboard | Single pane of glass for all CI/CD |

| Color-Coded Status | Instant visual feedback on build health |

| Historical Analytics | Data-driven insights for improvement |

| TA Analyzer | Complete test artifact traceability |

| Dynamic XOAH Links | Auto-extracted regression report links |

| Confluence Integration | Organized team documentation |

| Multi-Product Support | Ryzen-AI, VAI, ZenAI all in one place |

 

---

 

## Demo Checklist

 

- [ ] Show sidebar navigation

- [ ] Demonstrate color coding on live CI

- [ ] Click through 3-link strategy

- [ ] Show 7-day analytics range

- [ ] Demo TA Analyzer with real data

- [ ] Show Nightly Regression with XOAH links

- [ ] Quick tour of Confluence page feature

 
