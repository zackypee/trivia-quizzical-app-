export default function Homepage({state, onClick}){
    console.log(onClick)
    return(
        <section className="bg-[#F5F7FB} gap-2  flex flex-col h-screen justify-center items-center  ">
            <h1  className="text-[31.25px] text-[#293264] font-bold" >Quizzical</h1>
            <p className=" text-[#293264]  text-base ">Some description if needed</p>
            <button onClick={onClick} className="text-[#F5F7FB] mt-4 text-base bg-[#4D5B9E] rounded-xl px-8 py-2 cursor-pointer">Start quiz</button>

        </section>
    )
}