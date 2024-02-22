import Breadcrumb from "../components/Breadcrumb";
import Categories from "./Categories";

export default async function Category() {
    return <>
        <Breadcrumb name="Category" />
        <Categories />
    </>
}