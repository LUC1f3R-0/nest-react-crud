import type React from "react";
import AxiosInstance from "./services/apis/ApiInstances";

const App = () => {
  const fun = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    funfetch(formJson);
  };

  const funfetch = async (data: Record<string, FormDataEntryValue>) => {
    try {
      const response = await AxiosInstance.post("/users", data);

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Request failed:", error);
    }
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