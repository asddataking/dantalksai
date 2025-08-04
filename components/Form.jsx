import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

export default function Form({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    // Placeholder for sending form data via email or API
    // e.g., EmailJS or Axios POST request
    console.log(data)
    onSuccess?.()
    reset()
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto p-8 bg-slate-900/60 backdrop-blur rounded-lg shadow-lg space-y-6 text-white"
    >
      <div>
        <label className="block mb-2">Business Type</label>
        <select
          {...register('businessType', { required: true })}
          className="w-full px-4 py-2 rounded-md bg-slate-800"
        >
          <option value="">Select...</option>
          <option>Agency</option>
          <option>Consultant</option>
          <option>Freelancer</option>
          <option>Local Business</option>
        </select>
        {errors.businessType && <p className="text-red-500 text-sm mt-1">Please select a business type.</p>}
      </div>

      <div>
        <p className="mb-2">What Do You Need Help With?</p>
        <div className="flex flex-wrap gap-4">
          {['Lead Gen', 'Booking', 'CRM', 'Email', 'AI Agent'].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={item}
                {...register('needs', { required: true })}
                className="text-purple-500"
              />
              {item}
            </label>
          ))}
        </div>
        {errors.needs && <p className="text-red-500 text-sm mt-1">Select at least one option.</p>}
      </div>

      <div>
        <label className="block mb-2">Budget</label>
        <select
          {...register('budget', { required: true })}
          className="w-full px-4 py-2 rounded-md bg-slate-800"
        >
          <option value="">Select...</option>
          <option>Under $1k</option>
          <option>$1k - $5k</option>
          <option>$5k+</option>
        </select>
        {errors.budget && <p className="text-red-500 text-sm mt-1">Please choose a budget.</p>}
      </div>

      <div>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="w-full px-4 py-2 rounded-md bg-slate-800"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">Name is required.</p>}
      </div>

      <div>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full px-4 py-2 rounded-md bg-slate-800"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">Email is required.</p>}
      </div>

      <div>
        <label className="block mb-2">Phone (optional)</label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-2 rounded-md bg-slate-800"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(139,92,246,0.8)' }}
        className="w-full py-3 rounded-md bg-purple-600 font-semibold"
      >
        Submit
      </motion.button>
    </motion.form>
  )
}
