export const business = {
  name: 'EloGadgets.ng',
  shortName: 'EloGadgets',
  tagline: 'Quality gadgets. Buy, sell & swap. Your Uyo gadget plug.',
  phone: '09037503635',
  whatsapp: 'https://wa.me/2349037503635',
  email: 'hello@elogadgets.ng',
  whatsappChannel: 'https://whatsapp.com/channel/0029Vb7EoPQJ3jutulAR4N0i',
  whatsappCommunity: 'https://chat.whatsapp.com/Hmt09YXQHCz8sPUx6zziXH',
  tiktok: 'https://www.tiktok.com/@elogadgets.ng?_r=1&_t=ZS-9AQIKw5akE9',
  address: 'Shop A03, Plaza Penninah, 47 Oron Road, Uyo, Akwa Ibom State, Nigeria',
  directions: 'https://www.google.com/maps/search/?api=1&query=Shop%20A03%2C%20Plaza%20Penninah%2C%2047%20Oron%20Road%2C%20Uyo%2C%20Akwa%20Ibom%20State%2C%20Nigeria',
  availability: 'Online enquiries available 24/7',
  delivery: 'Nationwide delivery',
  categories: ['iPhones', 'Android phones', 'Laptops', 'Tablets', 'Accessories', 'Smartwatches', 'Audio and speakers', 'Gaming devices'],
  services: [
    { key: 'buy', number: '01 / BUY', title: 'Buy gadgets', description: 'Ask about the gadget you’re looking for and confirm current availability.', action: 'Enquire to buy', icon: '↗' },
    { key: 'sell', number: '02 / SELL', title: 'Sell gadgets', description: 'Tell us about the gadget you want to sell and ask how to proceed.', action: 'Enquire to sell', icon: '⌑' },
    { key: 'swap', number: '03 / SWAP', title: 'Swap gadgets', description: 'Ask about swapping a gadget and discuss the available options.', action: 'Ask about swaps', icon: '⇄' },
    { key: 'repair', number: '04 / REPAIRS', title: 'Gadget repairs', description: 'Send a repair enquiry to ask about your device.', action: 'Ask about repairs', icon: '⌁' },
    { key: 'delivery', number: '05 / DELIVERY', title: 'Nationwide delivery', description: 'Ask about delivery options for your location.', action: 'Ask about delivery', icon: '⌖' }
  ],
  messages: {
    general: 'Hello EloGadgets.ng, I have a general enquiry. Please assist me.',
    buy: 'Hello EloGadgets.ng, I’m interested in buying a gadget. Please share the available options.',
    sell: 'Hello EloGadgets.ng, I’m interested in selling a gadget. Please let me know how to proceed.',
    swap: 'Hello EloGadgets.ng, I’m interested in swapping a gadget. Please let me know how to proceed.',
    repair: 'Hello EloGadgets.ng, I have a repair enquiry. Please let me know how to proceed.',
    delivery: 'Hello EloGadgets.ng, I have a nationwide delivery enquiry. Please share the available details.'
  }
};

export const whatsappLink = (kind = 'general', context = '') => {
  const message = business.messages[kind] || business.messages.general;
  return `${business.whatsapp}?text=${encodeURIComponent(context ? `${message} ${context}` : message)}`;
};
