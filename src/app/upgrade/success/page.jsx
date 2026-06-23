import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        metadata,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        console.log('Payment successful for session:', metadata)
        return (
            <section id="success" className="flex items-center justify-center py-16 px-4">
                <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-100 text-center">

                    {/* Success Icon */}
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                                className="w-7 h-7 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Payment Successful 🎉
                    </h2>

                    {/* Message */}
                    <p className="text-gray-600 leading-relaxed">
                        We appreciate your business! A confirmation email will be sent to{" "}
                        <span className="font-medium text-gray-900">{customerEmail}</span>.
                        If you have any questions, feel free to contact us anytime.
                    </p>

                    {/* Email CTA */}
                    <div className="mt-6">
                        <a
                            href="mailto:orders@example.com"
                            className="inline-block px-5 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                        >
                            Contact Support
                        </a>
                    </div>

                    {/* Footer note */}
                    <p className="text-xs text-gray-400 mt-6">
                        Order reference and details have been saved in your account.
                    </p>
                </div>
            </section>
        )
    }
}