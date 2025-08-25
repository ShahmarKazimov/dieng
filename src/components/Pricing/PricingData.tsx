import { Check, X } from 'lucide-react';

import Button from '../ui/Button';
import { PricingItem } from '@/lib/types/pricing.types';
import React from 'react';

interface PricingDataProps {
    pricing: PricingItem[];
    currentLanguage: string;
}

const PricingData: React.FC<PricingDataProps> = ({ pricing }) => {
    if (!pricing || pricing.length === 0) {
        return (
            <div className="w-full py-20 text-center">
                <p className="text-gray-500">No pricing plans available</p>
            </div>
        );
    }

    const sortedPricing = [...pricing].sort((a, b) => {
        const falseCountA = a.benefits ? a.benefits.filter(benefit => !benefit.checked).length : 0;
        const falseCountB = b.benefits ? b.benefits.filter(benefit => !benefit.checked).length : 0;

        return falseCountB - falseCountA;
    });

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-between gap-y-8 gap-x-[10px]">
                {sortedPricing.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative rounded-xl w-full sm:max-w-[381px] shadow-lg p-2 bg-[#1D222E] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.isDefault
                            ? 'border-[#1D222E]'
                            : 'border-gray-200'
                            }`}
                    >

                        <div className="py-6 px-4 rounded-xl bg-[#242832] h-full flex flex-col">
                            {/* Header */}
                            <div className="text-start pb-5">
                                {plan.slogan && (
                                    <p className="text-sm text-white tracking-wider uppercase">
                                        {plan.slogan}
                                    </p>
                                )}
                                <div className='flex items-center justify-between'>
                                    <h3 className="text-2xl font-[euclid-Bold] text-white my-3">
                                        {plan.title}
                                    </h3>
                                    {plan.benefits && plan.benefits.length > 0 && plan.benefits.every(benefit => benefit.checked) && (
                                        <div className="w-max">
                                            <div className="bg-[#00990059] text-[#A9FFA9] px-3 py-[6px] rounded-full text-xs font-medium">
                                                Recommended
                                            </div>
                                        </div>
                                    )}

                                </div>
                                <p className="text-[#D1D1D1] text-sm leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Benefits */}
                            {plan.benefits && plan.benefits.length > 0 && (
                                <div className="py-3 flex-grow">
                                    <ul className="space-y-4">
                                        {plan.benefits
                                            .slice()
                                            .sort((a, b) => {
                                                if (a.checked === b.checked) return 0;
                                                return a.checked ? -1 : 1;
                                            })
                                            .map((benefit) => (
                                                <li
                                                    key={benefit.id}
                                                    className="flex items-start space-x-3"
                                                >
                                                    <div className="flex-shrink-0">
                                                        {benefit.checked ? (
                                                            <Check className="h-5 w-5 p-0.5 rounded-full text-white bg-[#009900] mt-0.5" />
                                                        ) : (
                                                            <X className="h-5 w-5 text-red-500 mt-0.5" />
                                                        )}
                                                    </div>
                                                    <span
                                                        className={`text-sm ${benefit.checked
                                                            ? 'text-[#FFFFFF]'
                                                            : 'text-gray-400 line-through'
                                                            }`}
                                                    >
                                                        {benefit.text}
                                                    </span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}

                            {/* Button */}
                            <div className="mt-8">
                                <Button
                                href='https://www.google.com/'
                                    className="bg-[#FFFFFF] text-[#000000] w-max"
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className='font-[euclid-Bold]'>{plan.buttonText || 'Get Started'}</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingData;