import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const demo = [
  {
    category: "Nuts & seeds",
    ingredients: ["Cashews"],
  },
  {
    category: "Protein",
    ingredients: ["Ground beef", "Bacon Strips"],
  },
];

const MenuCart = () => {

    const handleCheckBoxChange = (value) => {
        console.log(value);
    }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhzYDJe3u-jHfRLFij8L-y8WYFf45O05OyQ-x_d5DOV1xUWy9peYvZ8ZU&s"
              alt=""
            />
          </div>
          <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
            <p className="font-semibold text-xl">Burger</p>
            <p>$499</p>
            <p className="text-gray-400">nice food</p>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <form>
          <div className="flex gap-5 flex-wrap">
            {demo.map((item, index) => (
              <div>
                <p>{item.category}</p>
                <FormGroup>
                  {item.ingredients.map((item, index) => (
                    <FormControlLabel
                      control={<Checkbox onChange={() => handleCheckBoxChange(item)} />}
                      label={item}
                    />
                  ))}
                </FormGroup>

               
              </div>
            ))}

          </div>

          <div className="pt-5">
                  <Button variant="contained" disabled={false}>{true ? "Add to cart" : "Out Of Stock"}</Button>
                </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCart;
