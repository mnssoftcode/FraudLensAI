from pathlib import Path

try:
    from jinja2 import Environment
    from jinja2 import FileSystemLoader
except Exception:  # pragma: no cover - fallback when jinja2 not installed
    Environment = None
    FileSystemLoader = None


class ReportGenerator:

    def __init__(self):
        if Environment is not None and FileSystemLoader is not None:
            self.env = Environment(loader=FileSystemLoader("templates"))
        else:
            self.env = None

    def generate(
        self,
        overview,
        summary,
    ):

        if self.env is not None:
            template = self.env.get_template("eda/report.html")
            html = template.render(overview=overview, summary=summary)
        else:
            # Fallback simple HTML if jinja2 is unavailable
            html = "<!doctype html><html><head><meta charset='utf-8'><title>EDA Report</title></head><body>"
            html += "<h1>Exploratory Data Analysis Report</h1>"
            html += "<h2>Overview</h2><ul>"
            html += f"<li>Rows: {overview.get('rows')}</li>"
            html += f"<li>Columns: {overview.get('columns')}</li>"
            html += f"<li>Missing values: {overview.get('missing_values')}</li>"
            html += f"<li>Duplicate rows: {overview.get('duplicate_rows')}</li>"
            html += f"<li>Memory (MB): {overview.get('memory_mb')}</li>"
            html += "</ul>"
            html += "<h2>Summary</h2><pre>" + str(summary) + "</pre>"
            html += "</body></html>"

        output = Path("reports/eda")

        output.mkdir(
            parents=True,
            exist_ok=True,
        )

        report = output / "report.html"

        report.write_text(
            html,
            encoding="utf-8",
        )

        return str(report)