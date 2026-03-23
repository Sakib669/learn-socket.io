import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {}

type Inputs = {
  name: string;
  room: string;
};

const Join = ({}: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { name, room } = data;
    navigate(`/chat?name=${name}&room=${room}`);
  };

  return (
    <div className="w-full max-w-md px-4">
      {/* Card */}
      <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        {/* Glow border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 via-transparent to-blue-500/20 pointer-events-none" />

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500 to-blue-600 mb-4 shadow-lg shadow-violet-500/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Join a Room</h1>
          <p className="text-white/40 text-sm mt-1">Enter your name and room to get started</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name input */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-widest">Your Name</label>
            <input
              placeholder="e.g. John Doe"
              className={`w-full bg-white/5 border ${errors.name ? "border-red-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/60 focus:bg-white/10 transition-all duration-200`}
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-red-400 text-xs mt-0.5">This field is required</span>}
          </div>

          {/* Room input */}
          <div className="flex flex-col gap-1">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-widest">Room Name</label>
            <input
              placeholder="e.g. general"
              className={`w-full bg-white/5 border ${errors.room ? "border-red-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-violet-500/60 focus:bg-white/10 transition-all duration-200`}
              {...register("room", { required: true })}
            />
            {errors.room && <span className="text-red-400 text-xs mt-0.5">This field is required</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm tracking-wide hover:from-violet-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            Join Room →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;