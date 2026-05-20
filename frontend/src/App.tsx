import type React from "react";

const App = () => {
  
  const fun = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    funfetch(formJson);
  };

  const funfetch = async (data: Record<string, FormDataEntryValue>) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={fun}>
        <div>
          <input type="text" name="firstName" />
        </div>

        <div>
          <input type="text" name="lastName" />
        </div>

        <div>
          <input type="date" name="date" />
        </div>

        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default App;