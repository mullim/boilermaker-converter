# Boilermaker Converter Tool

The Boilermaker is a 15K road race in Utica, NY. The results for the race are released publicly as preformatted text. Computers aren't very good at understanding preformatted text so I wrote a parser to parse the results.

This tool takes results from years 2008-2019, parses it, and spits it back out in JSON format.

## Notes

- This tool is currently able to parse `182599` results and write it to a JSON file on a Core i7-1050U with 8gb of RAM in ~1500ms.
- There are some results that can't be parsed currently so there's some work that still needs to be done to fine tune this
