import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const FAQ = () => {
  return (
    <div className="w-full py-12 md:py-24 lg:py-24 text-custom-green">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="md:text-xl/relaxed">
              Get answers to your burning crypto investment questions.
            </p>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-4">
                  <h3 className="font-medium text-lg">
                    How do I buy cryptocurrencies?
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-white">
                    To buy cryptocurrencies, you&apos;ll need to set up a digital
                    wallet and connect it to a cryptocurrency exchange. Once
                    your wallet is set up, you can deposit funds and use them to
                    purchase various cryptocurrencies.
                  </p>
                  <p className="mt-2 text-white">
                    The process typically involves creating an account on a
                    reputable exchange, verifying your identity, and then
                    transferring funds from your bank account or debit card to
                    your exchange account. From there, you can browse the
                    available cryptocurrencies and place buy orders.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="py-4">
                  <h3 className="font-medium text-lg">
                    What is a digital wallet?
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-white">
                    A digital wallet is a software application that allows you
                    to store, send, and receive cryptocurrencies. It serves as a
                    secure place to hold your digital assets, similar to a
                    physical wallet for traditional currency.
                  </p>
                  <p className="mt-2 text-white">
                    Digital wallets come in various forms, such as mobile apps,
                    desktop applications, and hardware devices. They provide
                    features like private key management, transaction tracking,
                    and the ability to interact with cryptocurrency networks.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="py-4">
                  <h3 className="font-medium text-lg">
                    What are the risks of crypto investing?
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-white">
                    Investing in cryptocurrencies carries several risks,
                    including:
                  </p>
                  <ul className="text-white list-disc ml-5 mt-3">
                    <li>Volatility: Cryptocurrency prices can be highly volatile, with significant price swings in short periods.</li>
                    <li>Security risks: Digital wallets and exchanges can be vulnerable to hacking, theft, or loss of funds.</li>
                    <li>Regulatory uncertainty: Cryptocurrency regulations can change rapidly, which can impact the value and accessibility of cryptocurrencies.</li>
                    <li>Lack of consumer protections: Cryptocurrency transactions are generally irreversible, and there are limited consumer protection measures in place.</li>
                  </ul>
                  <p className="text-white mt-3">It&apos;s important to thoroughly research and understand the risks before investing in cryptocurrencies.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
