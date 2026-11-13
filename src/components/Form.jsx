import { useActionState } from "react";
import supabase from "../supabase-client"

function Form({ metrics }) {
  const [error, formAction, isPending]= useActionState(
  async (prevState, formData)=>{
    // grab the form data
    const newDeal = {
      name: formData.get("name"),
      value: formData.get("value")
    }
    // Call supabase and insert
    const {error} = await supabase.from("sales_deals").insert(newDeal)
    if(error){
      return new Error("Error adding a new deal")
    }
    return null
  }, null)

  const generateOptions = () => {
    return metrics.map((metric) => (
      <option key={metric.name} value={metric.name}>
        {metric.name}
      </option>
    ));
  };

  return (
    <div className="px-6 my-10 w-full">
      <form
        action={formAction}
        aria-label="Add new sales deal"
        aria-describedby="form-description"
        className="flex flex-col gap-4"
      >
        <div id="form-description" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter
          the amount.
        </div>

        <label htmlFor="deal-name" className="font-bold">
          Name:
          <select
            className="border px-2 py-1 bg-green-500 hover:bg-green-800 text-sm font-bold rounded"
            id="deal-name"
            name="name"
            defaultValue={metrics?.[0]?.name || ''}
            aria-required="true"
            // aria-invalid=
            // disabled=
          >
            {generateOptions()}
          </select>
        </label>

        <label htmlFor="deal-value" className="font-bold">
          Amount: $
          <input
            id="deal-value"
            type="number"
            name="value"
            defaultValue={0}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            min="0"
            step="10"
            aria-required="true"
            // aria-invalid=
            aria-label="Deal amount in dollars"
            // disabled=
          />
        </label>

        <button 
        className="border rounded p-2 bg-green-600 hover:bg-green-800 sm:w-52"
          type="submit" 
          // disabled=
          // aria-busy=
        >
          {isPending? "Adding Deal..." : "Add Deal"}
        </button>
      </form>

      {error? <h2>error.message</h2> : null}
    </div>
  );
};

export default Form;
