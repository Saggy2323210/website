const StatCard = ({ icon: Icon, number, label }) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-10">
      {Icon && (
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-ssgmce-blue/8 md:h-[4.5rem] md:w-[4.5rem]">
          <Icon className="text-2xl text-ssgmce-blue" />
        </div>
      )}
      <h3 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">{number}</h3>
      <p className="text-sm font-medium uppercase tracking-wide text-ssgmce-muted md:text-[0.95rem]">{label}</p>
    </div>
  );
};

export default StatCard;
