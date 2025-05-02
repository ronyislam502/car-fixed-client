const OurTeam = () => {
  const contents = [
    {
      id: 1,
      image: "https://i.postimg.cc/nLM6KFvD/member-3.jpg",
      name: "John Doe",
      specialty: "Engine Specialist",
    },
    {
      id: 2,
      image: "https://i.postimg.cc/fL9pF8qW/member-4.jpg",
      name: "Sarah Ahmed",
      specialty: "Transmission Expert",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/wTQ8gbq7/member-2.jpg",
      name: "Carlos Mendes",
      specialty: "Electrical Systems",
    },
  ];

  return (
    <div className="text-center py-6 px-6">
      <div className="">
        <h4 className="text-xl font-bold">Certified Team</h4>
        <h2 className="text-4xl font-extrabold pb-2">Our Experts Team</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-2">
        {contents.map((content) => (
          <div
            key={content?.id}
            className="card transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-xl pb-2"
          >
            <img
              src={content?.image}
              alt="Services"
              className="rounded-t-lg h-[410px]"
            />
            <div className="card-body items-center text-center rounded-b-lg bg-black/80">
              <h2 className="card-title text-xl font-bold">{content?.name}</h2>
              <p className="card-title font-md">{content?.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
