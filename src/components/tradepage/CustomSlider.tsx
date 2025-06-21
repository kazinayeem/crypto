import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const marks = {
  1: "1x",
  25: "25x",
  50: "50x",
  75: "75x",
  100: "100x",
  125: "125x",
};
export const CustomSlider = ({
  initialValue = 50,
  onChange,
}: {
  initialValue?: number;
  onChange?: (val: number | number[]) => void;
}) => {
  return (
    <div className="w-full relative px-5 pt-2 pb-6">
      <Slider
        min={1}
        max={125}
        marks={marks}
        step={null}
        defaultValue={initialValue}
        onChange={onChange}
        trackStyle={{ backgroundColor: "white" }}
        railStyle={{ backgroundColor: "#444" }}
        handleStyle={{ display: "none" }}
        className="rc-slider-custom"
      />
    </div>
  );
};
