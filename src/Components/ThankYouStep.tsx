import ThankYouIcon from '../Assets/images/icon-thank-you.svg';

export function ThankYouStep() {
  return (
    <div className="flex-1 p-[calc(3.5rem-1rem)] px-[calc(6.25rem-1rem-1rem)] py-[calc(2rem-1rem)] flex flex-col overflow-hidden">
      <div className="flex flex-col justify-center h-full flex-1 px-4 min-h-0 overflow-y-auto">
        <div className="flex flex-col items-center py-[4.9375rem]">
          <img className="w-[5rem] h-[5rem]" src={ThankYouIcon} alt="ThankYouIcon" />
          <h1 className="mt-8 text-[2rem] font-bold text-[hsl(213,96%,18%)]">Thank you!</h1>
          <p className="text-center mb-0 text-[1rem] leading-[1.5625rem] my-[0.6875rem] mb-[2.5rem] text-[hsl(231,11%,63%)]">
            Thanks for confirming your subscription! We hope you have fun using our platform. If you
            ever need support, please feel free to email us at suppor@loremgaming.com.
          </p>
        </div>
      </div>
    </div>
  );
}
