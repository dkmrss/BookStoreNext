import Home from "@/feature/home/index";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

const HomePage =  () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Loader color="red" type="bars" />
        </div>
      }
    >
      {/* @ts-expect-error Server Component */}
      <Home />
    </Suspense>
  );
};

export default HomePage;
