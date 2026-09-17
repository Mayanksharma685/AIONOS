import { AgentDecision } from "../models/AgentDecision.js";

export class PolicyEngine {
  decide(message: string): AgentDecision {
    const text = message.toLowerCase();

    if (!text.trim() || this.isVague(text)) {
      return new AgentDecision(
        "UNKNOWN",
        "CLARIFICATION",
        "Ask the employee what service or device is not working and request the error message if available.",
        "The request does not contain enough information to identify an applicable policy.",
        "I can help. Please tell me what is not working (for example laptop, VPN, email, printer, software, or account/login) and include the error message if there is one.",
        []
      );
    }

    if (this.hasAny(text, ["phishing", "suspicious email", "malware", "unauthorized access"])) {
      return new AgentDecision(
        "SECURITY_INCIDENT",
        "SECURITY_REVIEW",
        "Report the incident immediately to security@veridian-corp.example and do not forward it to other employees.",
        "KB-09 requires suspected phishing, malware, or unauthorized access attempts to be reported to Security immediately.",
        "Please report the suspected security incident immediately to security@veridian-corp.example. Do not forward the message to other employees.",
        ["KB-09"]
      );
    }

    if (text.includes("guest") && (text.includes("wi-fi") || text.includes("wifi") || text.includes("wireless"))) {
      return new AgentDecision(
        "GUEST_WIFI",
        "SELF_SERVICE",
        "Generate guest Wi-Fi credentials from the front-desk kiosk.",
        "KB-07 says any employee can generate credentials and no IT ticket is required.",
        "You can generate guest Wi-Fi credentials from the front-desk kiosk. They are valid for 24 hours and no IT ticket is required.",
        ["KB-07"]
      );
    }

    if (text.includes("contractor") && text.includes("vpn")) {
      return new AgentDecision(
        "CONTRACTOR_VPN",
        "MANAGER_APPROVAL",
        "Submit manager approval through the access request form.",
        "KB-02 requires manager approval for contractor VPN access.",
        "For a contractor, VPN access requires manager approval submitted through the access request form.",
        ["KB-02"]
      );
    }

    if (text.includes("vpn")) {
      if (text.includes("expired") || text.includes("90 days")) {
        return new AgentDecision(
          "VPN_CREDENTIAL_EXPIRATION",
          "EMPLOYEE_ACTION",
          "Renew the VPN credentials.",
          "KB-02 states that VPN credentials expire every 90 days and must be renewed by the employee.",
          "Your VPN credentials have expired. Please renew them; VPN credentials expire every 90 days and must be renewed by the employee.",
          ["KB-02"]
        );
      }

      return new AgentDecision(
        "VPN_ACCESS",
        "HUMAN_REVIEW",
        "Confirm whether the employee is full-time or a contractor before applying the VPN access rule.",
        "The supplied policy treats full-time employees and contractors differently.",
        "I need to know whether you are a full-time employee or a contractor because the VPN access process differs.",
        ["KB-02"]
      );
    }

    if (text.includes("locked out") || (text.includes("password") && (text.includes("6 times") || text.includes("failed")))) {
      return new AgentDecision(
        "ACCOUNT_LOCKOUT",
        "IT_ACTION",
        "IT must manually unlock the account.",
        "KB-01 says accounts locked after more than 5 failed attempts require IT to unlock them manually, with no approval required.",
        "Your account has reached the lockout condition. IT needs to manually unlock it. No approval is required.",
        ["KB-01"]
      );
    }

    if (text.includes("password") || text.includes("reset my password")) {
      return new AgentDecision(
        "PASSWORD_RESET",
        "SELF_SERVICE",
        "Use the self-service password portal.",
        "KB-01 allows employees to reset their own password at any time.",
        "You can reset your password through the self-service portal at any time. If you are locked out after 5 failed attempts, IT must manually unlock the account.",
        ["KB-01"]
      );
    }

    /*
     * KB-08 must be checked before the generic software rule.
     * Otherwise "expense software" gets incorrectly classified as KB-04.
     */
    if (text.includes("expense") || text.includes("expense tool") || text.includes("expense software")) {
      return new AgentDecision(
        "EXPENSE_TOOL_LOGIN",
        "IT_ACTION",
        "IT can assist with the login/technical issue if an expense account already exists; access itself is granted by Finance.",
        "KB-08 says Finance grants access and IT only assists with login/technical issues once an account exists.",
        "Finance grants access to the expense management tool. If your account already exists, IT can help with the login or technical problem.",
        ["KB-08"]
      );
    }

    /*
     * KB-04 non-catalog software detection.
     * Includes common ways an employee may describe software
     * that is not in the approved catalog.
     */
    if (
      text.includes("non-catalog") ||
      text.includes("non catalog") ||
      text.includes("not in the software catalog") ||
      text.includes("not in catalog") ||
      text.includes("isn't in the catalog") ||
      text.includes("is not in the catalog") ||
      text.includes("isn't in the software catalog") ||
      text.includes("is not in the software catalog")
    ) {
      return new AgentDecision(
        "NON_CATALOG_SOFTWARE",
        "SECURITY_REVIEW",
        "Wait for IT Security review.",
        "KB-04 requires IT Security review for non-catalog software and says the review takes 3–5 business days.",
        "Because the software is not in the approved catalog, it requires IT Security review. The stated review time is 3–5 business days.",
        ["KB-04"]
      );
    }

    if (text.includes("software") || text.includes("browser extension") || text.includes("extension")) {
      return new AgentDecision(
        "SOFTWARE_INSTALLATION",
        "CLARIFICATION",
        "Confirm whether the software or extension is listed in the approved catalog.",
        "KB-04 distinguishes catalog software from non-catalog software, but the request does not establish which category applies.",
        "Please confirm whether the requested software or browser extension is listed in the approved software catalog. If it is not, IT Security review is required and takes 3–5 business days.",
        ["KB-04"]
      );
    }

    if (text.includes("printer") || text.includes("paper jam")) {
      return new AgentDecision(
        "PRINTER_TROUBLESHOOTING",
        "IT_ACTION",
        "Check the printer queue and restart the print spooler. If it still fails, log a ticket with the printer asset tag.",
        "KB-05 gives those troubleshooting steps for printer issues.",
        "First check the printer queue and restart the print spooler. If the problem continues, log a ticket with the printer's asset tag.",
        ["KB-05"]
      );
    }

    if (text.includes("mailbox") || text.includes("mailbox full") || text.includes("can't send emails")) {
      return new AgentDecision(
        "MAILBOX_QUOTA",
        "EMPLOYEE_ACTION",
        "Archive old mail. Any increase above 25GB requires manager approval and cannot exceed 50GB.",
        "KB-06 sets the default quota at 25GB and recommends archiving old mail when nearing quota.",
        "Your mailbox quota is 25GB by default. Start by archiving old mail. If you need a quota increase above 25GB, manager approval is required and the maximum is 50GB.",
        ["KB-06"]
      );
    }

    if ((text.includes("home") || text.includes("remote")) && (text.includes("monitor") || text.includes("chair") || text.includes("equipment"))) {
      return new AgentDecision(
        "HOME_OFFICE_EQUIPMENT",
        "MANAGER_APPROVAL",
        "Obtain manager sign-off and Finance processing; IT handles shipping after approval.",
        "KB-10 applies to employees working remotely more than 3 days/week and requires manager sign-off and Finance processing.",
        "Working remotely more than 3 days/week makes you eligible for the one-time home office equipment allowance. Manager sign-off and Finance processing are required; IT handles shipping after approval.",
        ["KB-10"]
      );
    }

    if (text.includes("laptop") && (text.includes("dead") || text.includes("won’t turn on") || text.includes("won't turn on"))) {
      return new AgentDecision(
        "LAPTOP_HARDWARE_FAILURE",
        "HUMAN_REVIEW",
        "Route for IT assessment and early-replacement review if hardware failure is verified.",
        "KB-03 permits earlier replacement for verified hardware failure. The Asset Management Policy says hardware follows a 4-year refresh cycle and early replacement requires Finance sign-off in addition to IT approval.",
        "The laptop may qualify for early replacement if the hardware failure is verified. Because it is before the standard 4-year refresh cycle, the early-replacement request needs human IT/Finance review.",
        ["KB-03", "ASSET"]
      );
    }

    if (text.includes("laptop") && (text.includes("flicker") || text.includes("flickering") || text.includes("screen"))) {
      return new AgentDecision(
        "LAPTOP_HARDWARE_ISSUE",
        "IT_ACTION",
        "Have IT assess the hardware issue before considering replacement.",
        "KB-03 allows early replacement for verified hardware failure; the request itself does not establish a verified failure.",
        "The screen issue should be assessed by IT first. Early replacement can be considered if a hardware failure is verified.",
        ["KB-03"]
      );
    }

    if (text.includes("admin access") || (text.includes("finance reporting") && text.includes("server"))) {
      return new AgentDecision(
        "ADMIN_ACCESS_REQUEST",
        "HUMAN_REVIEW",
        "Route to an appropriate human access administrator for review.",
        "The supplied knowledge base does not define an approval process for admin access to the finance reporting server.",
        "The supplied Veridian policies do not define the approval process for admin access to this server, so I will not invent one. This needs human review.",
        []
      );
    }

    return new AgentDecision(
      "UNCLASSIFIED_IT_REQUEST",
      "HUMAN_REVIEW",
      "Route the request to a human IT support reviewer.",
      "No supplied policy clearly covers this request.",
      "I could not match this request to a specific supplied Veridian policy. It should be reviewed by IT rather than applying an unsupported rule.",
      []
    );
  }

  private hasAny(text: string, terms: string[]) {
    return terms.some(term => text.includes(term));
  }

  private isVague(text: string) {
    return text.replace(/[^a-z0-9]/g, "").length < 12 ||
      text.includes("its not working") ||
      text.includes("it's not working") ||
      text === "help";
  }
}