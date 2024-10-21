import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

test("all items displayed", () => {
    render(<ToDoList />);
    dummyGroceryList.forEach((item) => {
        const listItem = screen.getByText(item.name);
        expect(listItem).toBeInTheDocument();
    });
  });


test("item match number", () => {
    render(<ToDoList />);    
    const checkBoxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkBoxes[0]);
    var itemCount = screen.getByText(/Items bought:/).textContent?.split(" ")[2];
    expect(itemCount).toBe("1");
    fireEvent.click(checkBoxes[0]);
    itemCount = screen.getByText(/Items bought:/).textContent?.split(" ")[2];
    expect(itemCount).toBe("2");
    fireEvent.click(checkBoxes[0]);
    itemCount = screen.getByText(/Items bought:/).textContent?.split(" ")[2];
    expect(itemCount).toBe("1");
    fireEvent.click(checkBoxes[1]);
    itemCount = screen.getByText(/Items bought:/).textContent?.split(" ")[2];
    expect(itemCount).toBe("0");
  });

test("check ordering changes", () => {
    render(<ToDoList />);    
    const checkBoxes = screen.getAllByRole("checkbox");
    const firstCheckBox = checkBoxes[0];
    fireEvent.click(checkBoxes[0]);
    expect(checkBoxes[1].innerHTML).toBe(firstCheckBox.innerHTML);
  });

