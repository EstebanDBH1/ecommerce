import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { formatNumber } from "@/formatNumber";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative  bg-[#f7f7f7]">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-[#E32C2B] border-none">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-[#E32C2B]">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-[#E32C2B]">Sale</Badge>
          ) : null}
        </div>
        <CardContent className="p-1">
          <h2 className="text-[14px] uppercase pp-bold mb-2">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[12px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-[12px] roboto-mono  text-primary text-[#bababa]`}
            >
              COP ${formatNumber(product?.price)}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-[12px] roboto-mono  text-primary">
                ${formatNumber(product?.salePrice)}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <div>
            {isAuthenticated ? (
              <Button
                onClick={() =>
                  handleAddtoCart(product?._id, product?.totalStock)
                }
                className="w-full bg-white text-black border uppercase text-[12px] hover:bg-black hover:text-white "
              >
                Add to cart
              </Button>
            ) : (
              ""
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
