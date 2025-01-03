// @ts-ignore
import LocalButton from './Button';
import './fonts.css';
import './style.css';
import EventsCell from "./app/cells/EventsCell";
import BentoBox from "./app/components/BentoBox";
import { Heading, Lead, Subheading } from './app/components/text'
import {Gradient} from "./app/components/gradient";
import { clsx } from 'clsx'
import {Button} from './Button'
import SignUpForm from './form'
import Categories from "./components/Categories";
import React from 'react';

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx(className, 'px-6 lg:px-8')}>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">{children}</div>
    </div>
  )
}

const App = () => (
  <Grid/>
//  <div>
//    <span
//      className="translate-x-0 inline-block size-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
//    ></span>
//    <h1 className="text-color-red">Basic Host-Remote</h1>
//    <h2>Remote</h2>
//    <LocalButton />
//  </div>
);

const featuredPost = {
  id: 1,
  title: 'Meet up with the ummah',
  href: '#',
  description:
    'See whats going on near you attend, enjoy a range of events',
  date: 'Northampton',
  datetime: '2020-03-16',
  author: {
    name: 'RSS',
    href: '#',
    imageUrl:
      'https://raw.githubusercontent.com/tailwindlabs/heroicons/refs/heads/master/optimized/16/solid/arrow-down-right.svg',
  },
}
const posts = [
  {
    id: 2,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Lindsay Walton',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
]


function PricingCards() {
  return (
    <div className="relative py-24">
      <Gradient className="absolute inset-x-2 bottom-0 top-48 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
          {tiers.map((tier, tierIndex) => (
            <PricingCard key={tierIndex} tier={tier} />
          ))}
        </div>
        {/*<LogoCloud className="mt-24" />*/}
      </Container>
    </div>
  )
}

const tiers = [
  {
    name: 'Starter' as const,
    slug: 'starter',
    description: 'Everything you need to start selling.',
    priceMonthly: 99,
    href: '#',
    highlights: [
      { description: 'Up to 3 team members' },
      { description: 'Up to 5 deal progress boards' },
      { description: 'Source leads from select platforms' },
      { description: 'RadiantAI integrations', disabled: true },
      { description: 'Competitor analysis', disabled: true },
    ],
    features: [
      { section: 'Features', name: 'Accounts', value: 3 },
      { section: 'Features', name: 'Deal progress boards', value: 5 },
      { section: 'Features', name: 'Sourcing platforms', value: 'Select' },
      { section: 'Features', name: 'Contacts', value: 100 },
      { section: 'Features', name: 'AI assisted outreach', value: false },
      { section: 'Analysis', name: 'Competitor analysis', value: false },
      { section: 'Analysis', name: 'Dashboard reporting', value: false },
      { section: 'Analysis', name: 'Community insights', value: false },
      { section: 'Analysis', name: 'Performance analysis', value: false },
      { section: 'Support', name: 'Email support', value: true },
      { section: 'Support', name: '24 / 7 call center support', value: false },
      { section: 'Support', name: 'Dedicated account manager', value: false },
    ],
  },
  {
    name: 'Growth' as const,
    slug: 'growth',
    description: 'All the extras for your growing team.',
    priceMonthly: 149,
    href: '#',
    highlights: [
      { description: 'Up to 10 team members' },
      { description: 'Unlimited deal progress boards' },
      { description: 'Source leads from over 50 verified platforms' },
      { description: 'RadiantAI integrations' },
      { description: '5 competitor analyses per month' },
    ],
    features: [
      { section: 'Features', name: 'Accounts', value: 10 },
      { section: 'Features', name: 'Deal progress boards', value: 'Unlimited' },
      { section: 'Features', name: 'Sourcing platforms', value: '100+' },
      { section: 'Features', name: 'Contacts', value: 1000 },
      { section: 'Features', name: 'AI assisted outreach', value: true },
      { section: 'Analysis', name: 'Competitor analysis', value: '5 / month' },
      { section: 'Analysis', name: 'Dashboard reporting', value: true },
      { section: 'Analysis', name: 'Community insights', value: true },
      { section: 'Analysis', name: 'Performance analysis', value: true },
      { section: 'Support', name: 'Email support', value: true },
      { section: 'Support', name: '24 / 7 call center support', value: true },
      { section: 'Support', name: 'Dedicated account manager', value: false },
    ],
  },
  {
    name: 'Enterprise' as const,
    slug: 'enterprise',
    description: 'Added flexibility to close deals at scale.',
    priceMonthly: 299,
    href: '#',
    highlights: [
      { description: 'Unlimited active team members' },
      { description: 'Unlimited deal progress boards' },
      { description: 'Source leads from over 100 verified platforms' },
      { description: 'RadiantAI integrations' },
      { description: 'Unlimited competitor analyses' },
    ],
    features: [
      { section: 'Features', name: 'Accounts', value: 'Unlimited' },
      { section: 'Features', name: 'Deal progress boards', value: 'Unlimited' },
      { section: 'Features', name: 'Sourcing platforms', value: '100+' },
      { section: 'Features', name: 'Contacts', value: 'Unlimited' },
      { section: 'Features', name: 'AI assisted outreach', value: true },
      { section: 'Analysis', name: 'Competitor analysis', value: 'Unlimited' },
      { section: 'Analysis', name: 'Dashboard reporting', value: true },
      { section: 'Analysis', name: 'Community insights', value: true },
      { section: 'Analysis', name: 'Performance analysis', value: true },
      { section: 'Support', name: 'Email support', value: true },
      { section: 'Support', name: '24 / 7 call center support', value: true },
      { section: 'Support', name: 'Dedicated account manager', value: true },
    ],
  },
]

function FeatureItem({
  description,
  disabled = false,
}: {
  description: string
  disabled?: boolean
}) {
  return (
    <li
      data-disabled={disabled ? true : undefined}
      className="flex items-start gap-4 text-sm/6 text-gray-950/75 data-[disabled]:text-gray-950/25"
    >
      <span className="inline-flex h-6 items-center">
        {/*<PlusIcon className="size-[0.9375rem] shrink-0 fill-gray-950/25" />*/}
      </span>
      {disabled && <span className="sr-only">Not included:</span>}
      {description}
    </li>
  )
}


function PricingCard({ tier }: { tier: (typeof tiers)[number] }) {
  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
          <Subheading>{tier.name}</Subheading>
          <p className="mt-2 text-sm/6 text-gray-950/75">{tier.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="text-5xl font-medium text-gray-950">
              ${tier.priceMonthly}
            </div>
            <div className="text-sm/5 text-gray-950/75">
              <p>USD</p>
              <p>per month</p>
            </div>
          </div>
          <div className="mt-8">
            <Button href={tier.href}>Start a free trial</Button>
          </div>
          <div className="mt-8">
            <h3 className="text-sm/6 font-medium text-gray-950">
              Start selling with:
            </h3>
            <ul className="mt-3 space-y-3">
              {tier.highlights.map((props, featureIndex) => (
                <FeatureItem key={featureIndex} {...props} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Grid() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
        <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
          <Button variant={"outline"}>
            {featuredPost.date}
            </Button>
          <h2
            id="featured-post"
            className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
          >
            {featuredPost.title}
          </h2>
          <p className="mt-4 text-lg/8 text-gray-600">{featuredPost.description}</p>
          <Categories/>
          <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
            <SignUpForm/>
            {/*<div className="flex">*/}
            {/*  <a*/}
            {/*    href={featuredPost.href}*/}
            {/*    aria-describedby="featured-post"*/}
            {/*    className="text-sm/6 font-semibold text-indigo-600"*/}
            {/*  >*/}
            {/*    Continue reading <span aria-hidden="true">&rarr;</span>*/}
            {/*  </a>*/}
            {/*</div>*/}
            <div className="flex lg:border-t lg:border-gray-900/10 lg:pt-8">
              <a href={featuredPost.author.href} className="flex gap-x-2.5 text-sm/6 font-semibold text-gray-900">
                <img alt="" src={featuredPost.author.imageUrl} className="size-6 flex-none rounded-full bg-gray-50" />
                {featuredPost.author.name}
              </a>
              <a href={featuredPost.author.href} className="flex gap-x-2.5 text-sm/6 font-semibold text-gray-900">
                <img alt="" src={featuredPost.author.imageUrl} className="size-6 flex-none rounded-full bg-gray-50" />
                {featuredPost.author.name}
              </a>
            </div>
          </div>
        </article>
        <div className="mx-auto w-full max-w-2xl border-t border-gray-900/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
          <div className="-my-12 divide-y divide-gray-900/10">
            <PricingCards/>
          </div>
        </div>
      </div>
    </div>
  )
}



export default App;
