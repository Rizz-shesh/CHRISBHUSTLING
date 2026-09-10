type BotTrapFieldsProps = {
  value: string;
  onChange: (value: string) => void;
};

/** Hidden from people and assistive tech; commodity form bots commonly fill it. */
export function BotTrapFields({ value, onChange }: BotTrapFieldsProps) {
  return (
    <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
      <label>
        Website
        <input
          name="website"
          type="text"
          aria-label="Website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  );
}
