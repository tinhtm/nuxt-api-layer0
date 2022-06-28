<template>
  <div class="flex flex-col gap-y-3 p-[24px_8px_40px_28px]">
    <div class="flex items-center justify-between pr-5">
      <span class="text-[28px] leading-[30px] text-[#2A363E] font-bold">Terms & Conditions</span>
      <button class="text-[12px] leading-[26px] text-[#013253] cursor-pointer font-bold" @click="handleClose">CLOSE</button>
    </div>
    <div class="flex flex-col gap-y-3 max-h-[80vh] pr-5 overflow-auto scrollbar">
      <div 
        v-for="(content, index) in contents" 
        :key="index" 
        class="text-[#2A363E] flex flex-col gap-y-3"
      >
        <h3 class="font-bold mt-1 mb-1">{{ content.title }}</h3>
        <p v-for="(child, idx) in content.children" :key="idx" class="text-[14px] leading-[20px]" v-html="child"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  handleClose: Function
})

const contents = [
  {
    title: '',
    children: [
      `Welcome to drberg.com. By using this website, you agree to comply with the terms and conditions of drberg.com. These terms and conditions can change without notice by posting them to this website. If you do not agree then go elsewhere.`
    ]
  },
  {
    title: 'Disclaimer of Warranty',
    children: [
      `All content, materials, products, services and information on this website are given on an "as is" and "as available" basis, without warranties of any kind, either said or implied. Neither drberg.com nor its affiliates, nor the directors, officers, employees, agents, contractors, successors or assigns of each, shall be liable for any damages whatsoever arising out of or related to the use of, or inability to use, this website's information or any other website linked to this website. This waiver of liability applies to direct, indirect, incidental, consequential, special, punitive, exemplary or other damages you or others may suffer, as well as damages for lost profits, business interruption or the loss of data or information, even if drberg.com is notified in advance of the potential for any such damages and regardless of the form of action, whether in contract, tort, warranty, strict liability or otherwise.`
    ]
  },
  {
    title: 'Trademarks and Copyrights',
    children: [
      `You agree that all content appearing on the website including, but not limited to, code, trademarks, service marks, trade names, graphics, images, text, audio sections, icons, digital downloads, data compilations and computer software, are the sole property of drberg.com or its partners and suppliers, and are protected by United States and international copyright laws. All content on this website is the exclusive property of drberg.com and protected by United States and international copyright laws. All software used on this site is the property of drberg.com and protected by United States and international copyright laws. Users are granted permission to browse and use the drberg.com website for information only. Any other use, including and not limited to the reproduction, duplication, modification, distribution, sale, transmission, republication, removal, deletion, addition, framing, display, or performance of the content on this website or the exploitation in any other manner of any content of this website, in part or in whole, is strictly prohibited. Except as expressly authorized in writing, the use or misuse of any trademarks, service marks, trade names, logos, text, images, graphics, intellectual property or content from this website is strictly prohibited.`,
      `Drberg.com does not grant, by implication or otherwise, any license or right to use any trademark, service mark, trade name or logo, or the content displayed on this site without the prior written consent of Dr. Berg personally. Registered and unregistered proprietary information is owned and held by drberg.com and therefore, you may be liable for infringement or misappropriation or other legal action if you misuse this website in any form either mentioned or unmentioned.`
    ]
  },
  {
    title: 'Third Party Websites',
    children: [
      `Any 3rd party websites are independent from drberg.com, and drberg.com has no control over, or responsibility with respect to, the information provided or activities undertaken by any such website. A link between drberg.com and another website further does not mean that drberg.com endorses that website. Linking to off-site pages is done at your own risk, requiring you to make your own independent decisions. Drberg.com expressly disclaims any responsibility or liability for any damage, loss, or injury arising out of the factors from 3rd party websites`
    ]
  },
  {
    title: 'User Restrictions',
    children: [
      `This website is for your personal, non-commercial only. You agree that you will not use this website for any purpose including, but not limited to, advertising, or selling products; to monitor, gather or copy content on this website by using any robot, "bot", spider, crawler, spyware, engine, device, software, extraction tool, or any other automatic device, utility, or manual process of any kind; to frame or utilize framing techniques to enclose any trademark or other proprietary information including, but not limited to, any images, text, or page layout; use any meta tags or any other "hidden text" utilizing Dr. Berg's name or any trademarks. You may not modify, reproduce, duplicate, copy, distribute, sell, resell, publish, license, visit or otherwise exploit this website.`
    ]
  },
  {
    title: 'Unlawful Conduct',
    children: [
      `You agree that you are prohibited from posting or transmitting to the drberg.com website any libelous, defamatory, obscene, inflammatory, pornographic or profane way. Drberg.com reserves the right to seek all remedies for violations of these terms and conditions.`
    ]
  },
  {
    title: 'Product Descriptions',
    children: [
      ` Drberg.com attempts to be as accurate as possible. However, drberg.com does not claim that any content of this website is accurate, complete, reliable, current or error free.`
    ]
  },
  {
    title: 'Revisions',
    children: [
      `Drberg.com may, at its sole discretion, and with or without notice to you, make changes to, or discontinue, any aspect of this website including, without limitation, any content, products, services or prices offered through this website.`
    ]
  },
  {
    title: 'Consent',
    children: [
      `By accessing, browsing and/or using this website, you acknowledge that you have read, understood and agree to be bound by these terms and conditions.`
    ]
  },
  {
    title: 'Indemnity',
    children: [
      `You agree to hold harmless drberg.com, its affiliates, officers, employees, agents, licensors and licensees from any damages, liabilities, costs and expenses, including reasonable attorneys' fees, on account of any claim, suit, action, demand or proceeding made or brought against any such party, or on account of the investigation, defense or settlement thereof, arising with your use of this website.`
    ]
  },
  {
    title: 'Enforceability and Governing Law',
    children: [
      `Your use of drberg.com is governed with the laws of the state of Virginia, without regard to its law provisions. Any action against drberg.com arising from the use of the website and the provisions of these terms and conditions must be brought by you exclusively in the state or federal courts located in Virginia.`
    ]
  },
  {
    title: 'Your Representations',
    children: [
      `You state that you are 18 years of age or older.`
    ]
  },
  {
    title: 'Return/Refund Policy',
    children: [
      `<a href="https://shop.drberg.com/return-policy" target="_blank" class="text-[#0091A8] underline cursor-pointer">Click here for our Shipping and Refund Policy</a>`
    ]
  },
  {
    title: 'Customer Service',
    children: [
      `If you have any questions, please contact us: <a href="https://help.drberg.com" target="_blank" class="text-[#0091A8] underline cursor-pointer">https://help.drberg.com</a>`
    ]
  },
  {
    title: 'Dr. Berg Text Messaging Program Terms & Conditions',
    children: [
      `You agree to receive recurring automated promotional and personalized marketing text (e.g., SMS and MMS) messages (e.g. cart reminders) from The Health & Wellness Center, Inc. dba Dr. Berg Nutritionals (“Dr. Berg”), including text messages that may be sent using an automatic telephone dialing system or other similar technology, to the mobile telephone number you provided when signing up or any other number that you designate. These terms and conditions include your agreement to resolve any disputes with us through binding, individual-only arbitration as detailed in the “Dispute Resolution” section below.`,
      `Consent to receive automated marketing text messages is not a condition of any purchase. Dr. Berg does not charge you for participation in our text messaging program, but Msg & Data rates may apply.`,
      `Message frequency will vary. Dr. Berg reserves the right to alter the frequency of messages sent at any time, so as to increase or decrease the total number of sent messages. Dr. Berg also reserves the right to change the short code or phone number from which messages are sent and we will notify you when we do so.`,
      `By participating in Dr. Berg’s text messaging program, you also agree to our <a href="https://shop.drberg.com/terms-and-conditions" target="_blank" class="text-[#0091A8] underline cursor-pointer">Dr. Berg Terms of Use</a> and <a href="https://shop.drberg.com/privacy-policy-cookie-restriction-mode" target="_blank" class="text-[#0091A8] underline cursor-pointer">Dr. Berg Privacy Policy</a>.`,
      `You may not use of engage with Dr. Berg’s text messaging program if you are under thirteen (13) years of age. If you use or engage with Dr. Berg’s text messaging program and are between the ages of thirteen (13) and eighteen (18) years of age (or the legal age of majority where you live, if older), you must have your parent’s or legal guardian’s permission to do so. By using or engaging with Dr. Berg’s text messaging program, you acknowledge that you are: (i) not under the age of thirteen (13) years, (ii) between the ages of thirteen (13) and eighteen (18) and have your parent’s or legal guardian’s permission to use or engage with Dr. Berg’s text messaging program, and/or (iii) are of the age or majority where you reside and have the capacity to enter into a legally binding agreement.`,
      `Not all mobile devices or handsets may be supported and our messages may not be deliverable in all areas. Dr. Berg, its service providers and the mobile carriers supported by the program are not liable for delayed or undelivered messages. The text messaging program will send SMS terminating messages if your mobile device does not support MMS messaging.`,
      `We are able to deliver messages to the following mobile phone carriers: Major carriers: AT&T, Verizon Wireless, Sprint, T-Mobile, MetroPCS, U.S. Cellular, Alltel, Boost Mobile, Nextel, and Virgin Mobile. Minor carriers: Alaska Communications Systems (ACS), Appalachian Wireless (EKN), Bluegrass Cellular, Cellular One of East Central IL (ECIT), Cellular One of Northeast Pennsylvania, Cincinnati Bell Wireless, Cricket, Coral Wireless (Mobi PCS), COX, Cross, Element Mobile (Flat Wireless), Epic Touch (Elkhart Telephone), GCI, Golden State, Hawkeye (Chat Mobility), Hawkeye (NW Missouri), Illinois Valley Cellular, Inland Cellular, iWireless (Iowa Wireless), Keystone Wireless (Immix Wireless/PC Man), Mosaic (Consolidated or CTC Telecom), Nex-Tech Wireless, NTelos, Panhandle Communications, Pioneer, Plateau (Texas RSA 3 Ltd), Revol, RINA, Simmetry (TMP Corporation), Thumb Cellular, Union Wireless, United Wireless, Viaero Wireless, and West Central (WCC or 5 Star Wireless).`,
      `If at any time you intend to stop using the mobile telephone number that has been used to subscribe to our text messaging program, including canceling your service plan or selling or transferring the phone number to another person, you agree that you will complete the cancellation process described below prior to ending your use of the mobile telephone number. You understand and agree that your agreement to do so is a material part of these terms and conditions. You further agree that, if you discontinue the use of your mobile telephone number without notifying us of such change or without completing the cancellation process, you agree that you will be responsible for all costs (including attorneys’ fees) and liabilities incurred by us, or any party that assists in the delivery of mobile messages (including Attentive and your mobile service provider), as a result of claims brought by individual(s) who are later assigned that mobile telephone number. This duty and agreement shall survive any cancellation or termination of your agreement to participate in Dr. Berg’s text messaging program.`
    ]
  },
  {
    title: 'YOU AGREE THAT YOU SHALL INDEMNIFY, DEFEND, AND HOLD US HARMLESS FROM ANY CLAIM OR LIABILITY RESULTING FROM YOUR FAILURE TO NOTIFY US OF A CHANGE IN THE INFORMATION YOU HAVE PROVIDED, INCLUDING ANY CLAIM OR LIABILITY UNDER THE TELEPHONE CONSUMER PROTECTION ACT, 47 U.S.C. § 227, et seq., OR SIMILAR STATE AND FEDERAL LAWS, AND ANY REGULATIONS PROMULGATED THEREUNDER RESULTING FROM US ATTEMPTING TO CONTACT YOU AT THE MOBILE TELEPHONE NUMBER YOU PROVIDED.',
    children: []
  },
  {
    title: 'Cancellation',
    children: [
      `Text the keyword STOP, END, CANCEL, UNSUBSCRIBE or QUIT to our shortcode to cancel. After texting STOP, END, CANCEL, UNSUBSCRIBE or QUIT to our shortcode you will receive one additional message confirming that your request has been processed. You acknowledge that our text message platform may not recognize and respond to unsubscribe requests that do not include the STOP, END, CANCEL, UNSUBSCRIBE or QUIT keyword commands and agree that Dr. Berg and its service providers will have no liability for failing to honor such requests. If you unsubscribe from one of our text message programs, you may continue to receive text messages from Dr. Berg through any other programs you have joined until you separately unsubscribe from those programs.`
    ]
  },
  {
    title: 'Help',
    children: [
      `Text the keyword HELP to our shortcode to return customer care contact information.`
    ]
  },
  {
    title: 'Customer Care',
    children: [
      `If you are experiencing any problems, please visit <a href="https://support.attentivemobile.com/help/" target="_blank" class="text-[#0091A8] underline cursor-pointer">https://support.attentivemobile.com/help/</a> and submit the form with details about your problem or your request for support, or email support@attentivemobile.com.`
    ]
  },
  {
    title: 'Contact',
    children: [
      `This message program is a service of Dr. Berg, located at 4501 Ford Avenue, Alexandria, Virginia 22302.`
    ]
  },
  {
    title: 'Dispute Resolution',
    children: [
      `General. In the interest of resolving disputes between you and Dr. Berg in the most expedient and cost effective manner, you and Dr. Berg agree that any dispute arising out of or in any way related to these messaging terms and conditions ("Messaging Terms") or your receipt of text messages from Dr. Berg or its service providers will be resolved by binding arbitration. Arbitration is less formal than a lawsuit in court. Arbitration uses a neutral arbitrator instead of a judge or jury, may allow for more limited discovery than in court, and can be subject to very limited review by courts. Arbitrators can award the same damages and relief that a court can award. This agreement to arbitrate disputes includes all claims arising out of or in any way related to these Messaging Terms, or your receipt of text messages from Dr. Berg or its service providers whether based in contract, tort, statute, fraud, misrepresentation, or any other legal theory, and regardless of when a claim arises. YOU UNDERSTAND AND AGREE THAT, BY AGREEING TO THESE MESSAGING TERMS, YOU AND Dr. Berg ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION AND THAT THESE MESSAGING TERMS SHALL BE SUBJECT TO AND GOVERNED BY THE FEDERAL ARBITRATION ACT.`,
      `Exceptions. Notwithstanding subsection (a) above, nothing in these Messaging Terms will be deemed to waive, preclude, or otherwise limit the right of you or Dr. Berg to: (i) bring an individual action in small claims court; (ii) pursue an enforcement action through the applicable federal, state, or local agency if that action is available; (iii) seek injunctive relief in aid of arbitration from a court of competent jurisdiction; or (iv) file suit in a court of law to address an intellectual property infringement claim.`,
      `Arbitrator. Any arbitration between you and Dr. Berg will be governed by the Federal Arbitration Act and the Commercial Dispute Resolution Procedures and Supplementary Procedures for Consumer Related Disputes (collectively, "AAA Rules") of the American Arbitration Association ("AAA"), as modified by these Messaging Terms, and will be administered by the AAA. The AAA Rules and filing forms are available online at www.adr.org, by calling the AAA at 1-800-778-7879, or by contacting Dr. Berg. The arbitrator has exclusive authority to resolve any dispute relating to the interpretation, applicability, or enforceability of this binding arbitration agreement.`,
      `Notice; Process. If you or Dr. Berg intends to seek arbitration, then the party seeking arbitration must first send a written notice of the dispute to the other party by U.S. Mail ("Notice"). Dr. Berg address for Notice is: 4501 Ford Avenue, Alexandria, Virginia 22302, Attn: Chief Executive Officer. The Notice must: (i) describe the nature and basis of the claim or dispute; and (ii) set forth the specific relief sought ("Demand"). You and Dr. Berg will make good faith efforts to resolve the claim directly, but if you and Dr. Berg do not reach an agreement to do so within 30 days after the Notice is received, you or Dr. Berg may commence an arbitration proceeding. During the arbitration, the amount of any settlement offer made by you or Dr. Berg must not be disclosed to the arbitrator until after the arbitrator makes a final decision and award, if any. (e) Fees. If you commence arbitration in accordance with these Messaging Terms, Dr. Berg will reimburse you for your payment of the filing fee, unless your claim is for more than $15,000 or as set forth below, in which case the payment of any fees will be decided by the AAA Rules. If the claim is for $15,000 or less, you may choose whether the arbitration will be conducted: (i) solely on the basis of documents submitted to the arbitrator; (ii) through a non-appearance based telephone hearing; or (iii) by an in-person hearing as established by the AAA Rules. If the arbitrator finds that either the substance of your claim or the relief sought in the Demand is frivolous or brought for an improper purpose (as measured by the standards set forth in Federal Rule of Civil Procedure 11(b)), then the payment of all fees will be governed by the AAA Rules. In that case, you agree to reimburse Dr. Berg for all monies previously disbursed by it that are otherwise your obligation to pay under the AAA Rules. Regardless of the manner in which the arbitration is conducted, the arbitrator must issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the decision and award, if any, are based. You and Dr. Berg agree that such written decision, and information exchanged during arbitration, will be kept confidential except to the extent necessary to enforce or permit limited judicial review of the award. The arbitrator may make rulings and resolve disputes as to the payment and reimbursement of fees or expenses at any time during the proceeding and upon request from you or Dr. Berg made within 14 days of the arbitrator's ruling on the merits.`,
      `No Class Actions. YOU AND Dr. Berg AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, unless both you and Dr. Berg agree otherwise in a signed writing, the arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding.`,
      `Modifications to this Arbitration Provision. Notwithstanding anything to the contrary in these Messaging Terms, if Dr. Berg makes any future change to this arbitration provision, other than a change to Dr. Berg address for Notice, you may reject the change by sending us written notice within 30 days of the change to Dr. Berg address for Notice, in which case this arbitration provision, as in effect immediately prior to the changes you rejected, will continue to govern any disputes between you and Dr. Berg.`,
      `Enforceability. If an arbitrator decides that applicable law precludes enforcement of any of the limitations of subsection (f) above (addressing class, representative and consolidated proceedings) as to a particular claim for relief, then that claim (and only that claim) must be severed from the arbitration and brought in court. If any other provision of these Messaging Terms is found to be unenforceable, the applicable provision shall be deemed stricken and the remainder of these Messaging Terms shall remain in full force and effect.`,
      `California Civil Code Section 1798.83 permits users of the Program that are California residents to request certain information regarding our disclosure of the information you provide through the Program to third parties for their direct marketing purposes. To make such a request, or if you have any other questions about the Program, these Terms and Conditions, or our Privacy Policy, please contact us at the following address:`,
      `The Health & Wellness Center, Inc. dba Dr. Berg Nutritionals`,
      `4501 Ford Avenue, suite 608`,
      `Alexandria, VA 22302`,
      `+1 703-354-7336`,
      `*Disclaimer: The dietary products may not have undergone evaluation and/or testing by the United States Food and Drug Administration. The recommendation of this program is not designed to treat, prevent or cure medical diseases. Before undertaking any recommendations or changes in diet or exercise within consult with your physician.`,
      `Dr. Eric Berg DC is not a medical doctor - he is a Chiropractor. We do not diagnose or treat medical ailments or diseases. This program is designed for educational benefits only. Any Testimonials referred to in this Web site were volunteered by the makers without an offer of compensation. The results referred to in Testimonials may not be typical and others results may vary.`
    ]
  }
]
</script>

<style lang="scss" scoped>
  .scrollbar::-webkit-scrollbar {
    width: 2px;
  }
  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #D3D6D7;
  }
</style>