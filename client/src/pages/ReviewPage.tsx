import ReviewStar from "@app/assets/icons/ReviewStar";
import Layout from "@app/components/Layout";
import ReviewCard from "@app/components/ReviewCard";
import { Routes } from "@app/router/rooter";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ReviewPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="p-20 dark:bg-[#1B1B1B]">
        <div className="">
          <img
            src="/reviewtest.png"
            alt="Image"
            className="float-left mb-6 mr-8 h-[720px] w-[620px] rounded-[20px]"
          />
        </div>
        <div className="">
          <div className="flex justify-start text-[40px] font-semibold dark:text-white">
            Minecraft toys
          </div>
          <div className="mb-4 flex justify-start text-[32px] font-medium dark:text-white">
            Betman & Superman
          </div>
          <div className="mb-3 flex justify-start text-2xl">
            <span className="font-medium	 dark:text-white">
              {`${t("Review.category")}:`}
            </span>
            <span className="ml-1 dark:text-white">Toy</span>
          </div>
          <div className="mb-3 flex justify-start text-2xl">
            <span className="font-medium	 dark:text-white">
              {`${t("Review.tags")}:`}
            </span>
            <span className="ml-1 dark:text-white">#photo #art #fashion</span>
          </div>
          <div className="mb-2 flex">
            <div className="flex justify-start text-2xl">
              <span className="font-medium	 dark:text-white">
                {`${t("Review.createdby")}:`}
              </span>
              <span className="ml-1 dark:text-white">Henry Adams</span>
            </div>
            <div className="ml-4 self-end text-base text-[#717171] dark:text-[#9C9C9C]">
              22/08/2023
            </div>
          </div>
          <div className="flex h-8">
            <ReviewStar />
            <span className="ml-4 self-center dark:text-white">4.0</span>
          </div>
          <p className="mt-[38px] text-left dark:text-white">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus,
            sunt beatae dolor, modi iste error assumenda, porro enim incidunt
            commodi nisi. Ea esse cumque deserunt reiciendis consequuntur quos
            est. Sed.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Doloribus, sunt beatae dolor, modi iste error assumenda, porro enim
            incidunt commodi nisi. Ea esse cumque deserunt reiciendis
            consequuntur quos est. Sed.Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Doloribus, sunt beatae dolor, modi iste error
            assumenda, porro enim incidunt commodi nisi. Ea esse cumque deserunt
            reiciendis consequuntur quos est. Sed.Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Doloribus, sunt beatae dolor, modi
            iste error assumenda, porro enim incidunt commodi nisi. Ea esse
            cumque deserunt reiciendis consequuntur quos est. Sed.Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Doloribus, sunt beatae
            dolor, modi iste error assumenda, porro enim incidunt commodi nisi.
            Ea esse cumque deserunt reiciendis consequuntur quos est. Sed.Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, sunt
            beatae dolor, modi iste error assumenda, porro enim incidunt commodi
            nisi. Ea esse cumque deserunt reiciendis consequuntur quos est.
            Sed.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Doloribus, sunt beatae dolor, modi iste error assumenda, porro enim
            incidunt commodi nisi. Ea esse cumque deserunt reiciendis
            consequuntur quos est. Sed.Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Doloribus, sunt beatae dolor, modi iste error
            assumenda, porro enim incidunt commodi nisi. Ea esse cumque deserunt
            reiciendis consequuntur quos est. Sed.Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Doloribus, sunt beatae dolor, modi
            iste error assumenda, porro enim incidunt commodi nisi. Ea esse
            cumque deserunt reiciendis consequuntur quos est. Sed.umenda, porro
            enim incidunt commodi nisi. Ea esse cumque deserunt reiciendis
            consequuntur quos est. Sed.Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Doloribus, sunt beatae dolor, modi iste error
            assumenda, porro enim incidunt commodi nisi. Ea esse cumque deserunt
            reiciendis consequuntur quos est. Sed.Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Doloribus, sunt beatae dolor, modi
            iste error assumenda, porro enim incidunt commodi nisi. Ea esse
            cumque deserunt reiciendis consequuntur quos est. Sed.Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Doloribus, sunt beatae
            dolor, modi iste error assumenda, porro enim incidunt commodi nisi.
            Ea esse cumque deserunt reiciendis consequuntur quos est. Sed.Lorem
            ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, sunt
            beatae dolor, modi
          </p>
        </div>
        <div className="flex flex-col">
          <div className="mt-20 flex items-start text-2xl dark:text-white">
            {t("Review.similiarReviews")}
          </div>
          <div className="mt-6 flex justify-between">
            {Array.from({ length: 1 }).map((item: any, i) => (
              <div key={i}>
                <Link to={`${Routes.reviewpage}/2`}>
                  <ReviewCard />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20">
          <textarea
            placeholder={t("Review.yourComment")}
            className="h-[115px] w-full rounded-[6px] border border-solid border-[#044D69] bg-[transparent] placeholder:text-black dark:border-[#DEDEDE] dark:placeholder:text-white"
          ></textarea>
        </div>
        <div className="my-4 flex justify-end">
          <button
            type="button"
            className="flex h-[48px] w-[182px] items-center justify-center rounded-md bg-gradientBtnBlue px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("Review.postComment")}
          </button>
        </div>
        <div className="mb-10 flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div
                role="button"
                tabIndex={0}
                className="cursor-pointer"
                aria-label="Go to user page"
              >
                <img
                  src="/testprofile.jpeg"
                  className="h-[44px] w-[44px] rounded-[32px]"
                />
              </div>
              <div className="ml-2 flex flex-col items-start dark:text-white">
                <span className="text-lg font-medium">Jeyhun Jeyhunzade</span>
                <span className="text-sm text-[#989292]">24/08/2023</span>
              </div>
            </div>
          </div>
          <div className="mt-1 text-left dark:text-white">
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewPage;
